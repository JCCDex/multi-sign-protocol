import { ActionType, CHAIN_ID, MEMO_TYPE } from "./constant/type";
import {
  IAccountObjects,
  IBaseMultisignTx,
  IEnableTopic,
  IMultiSignOptions,
  IPayload,
  IPaymentTopic,
  ISignerSetTopic,
  ISubmitMultiSigned
} from "./types";
import { IToken } from "./types/common";
import { convertMemo, convertTime, isDef, isJSON, isPositiveInteger, isPositiveStr, string2json } from "./util";
import wallet from "./util/wallet";
import { isValidCurrency } from "@swtc/common";
import { IAmount } from "./types/common";
import BigNumber from "bignumber.js";
import { service } from "./fetch/service";
import { ENABLE_TEMPLATE, PAYMENT_TEMPLATE, SIGNER_SET_TEMPLATE } from "./constant/template";
import invariant from "./util/tiny-invariant";
import { IMultiTransfer } from "./types/tp-transfer";
import transfer from "./util/tp-helper";

export default class MultiSignTransaction {
  private token: IAmount;
  private chainId = CHAIN_ID.SWTC;

  constructor(options: IMultiSignOptions) {
    const { token } = options;
    this.token = token;
  }

  /**
   * 获取多签账号列表及权重
   *
   * @static
   * @param {*} { node, account }
   * @returns {Promise<IAccountObjects>}
   * @memberof MultiSignTransaction
   */
  public static async fetchSignerList({ node, account }): Promise<IAccountObjects> {
    const res: any = await service({
      url: node,
      method: "post",
      data: {
        method: "account_objects",
        params: [
          {
            account,
            type: "SignerList"
          }
        ]
      }
    });
    const signerInfo = res?.result?.account_objects?.[0];

    if (!isDef(signerInfo)) {
      return null;
    }

    return {
      SignerEntries: signerInfo.SignerEntries,
      SignerQuorum: signerInfo.SignerQuorum
    };
  }

  /**
   * 获取区块上所有交易
   *
   * @static
   * @param {*} {node, block}
   * @returns
   * @memberof MultiSignTransaction
   */
  public static async fetchBlockTransactions({ node, block }) {
    const res: any = await service({
      method: "get",
      url: node + "/block/trans/" + block,
      params: {
        b: block
      }
    });
    if (res.code === "0" && Array.isArray(res?.data?.list)) {
      const txs = res?.data?.list;
      return txs.map((tx) => {
        const { memos } = tx || {};
        const memo = convertMemo(memos);
        const action = isJSON(memo) ? string2json(memo) : memo;
        return Object.assign({}, tx, { memo: action, time: convertTime(tx.time) });
      });
    }
    return [];
  }

  /**
   * 获取最新区块
   *
   * @static
   * @param {string} node
   * @returns {Promise<number>}
   * @memberof MultiSignTransaction
   */
  public static async fetchLatestBlock(node: string): Promise<number> {
    const res: any = await await service({
      url: node,
      method: "post",
      data: {
        method: "ledger_closed"
      }
    });
    return res?.result?.ledger_index;
  }

  public isNativeToken(token: IToken): boolean {
    return (
      (token?.currency?.toUpperCase() === "SWT" || token?.currency?.toUpperCase() === "SWTC") && token?.issuer === ""
    );
  }

  public isNonNativeToken(token: IToken): boolean {
    return isValidCurrency(token?.currency) && wallet.isValidAddress(token?.issuer);
  }

  public compareToken(token1: IToken, token2: IToken): boolean {
    return (
      (this.isNativeToken(token1) && this.isNativeToken(token2)) ||
      (token1.currency.toUpperCase() === token2.currency.toUpperCase() && token1.issuer === token2.issuer)
    );
  }

  public compareAmount(amount: IAmount): boolean {
    return this.compareToken(amount, this.token) && new BigNumber(amount.value).eq(this.token.value);
  }

  public isSend(type: string): boolean {
    return type === "Send";
  }

  public isReceive(type: string): boolean {
    return type === "Receive";
  }

  public isSuccess(v: string): boolean {
    return v === "tesSUCCESS";
  }

  public isAmount(amount: IAmount): boolean {
    return new BigNumber(amount.value).isPositive() && (this.isNativeToken(amount) || this.isNonNativeToken(amount));
  }

  /**
   * 序列化转账topic
   *
   * @param {*} { name, description, deadline, from, to, seq, token }
   * @returns {IPaymentTopic}
   * @memberof MultiSignTransaction
   */
  public serializePaymentTopic({ name, description, deadline, from, to, seq, token }): IPaymentTopic {
    const data = {
      type: MEMO_TYPE.MULTI_SIGN,
      template: PAYMENT_TEMPLATE.name,
      chainId: this.chainId,
      topic: {
        name,
        description,
        deadline,
        operation: {
          chainId: this.chainId,
          from,
          to,
          seq,
          token
        }
      }
    };
    invariant(this.isPaymentTopic(data), "The topic includes invalid value");
    return data;
  }

  /** 序列化恢复密钥topic
   *
   *
   * @param {*} { name, description, deadline, seq, account }
   * @returns {IEnableTopic}
   * @memberof MultiSignTransaction
   */
  public serializeEnableTopic({ name, description, deadline, seq, account }): IEnableTopic {
    const data = {
      type: MEMO_TYPE.MULTI_SIGN,
      template: ENABLE_TEMPLATE.name,
      chainId: this.chainId,
      topic: {
        name,
        description,
        deadline,
        operation: {
          chainId: this.chainId,
          account,
          seq,
          options: {
            clear_flag: 4
          }
        }
      }
    };
    invariant(this.isEnableTopic(data), "The topic includes invalid value");
    return data;
  }

  /**
   * 序列化多签成员管理topic
   *
   * @param {*} { name, description, deadline, seq, account, threshold, lists }
   * @returns {ISignerSetTopic}
   * @memberof MultiSignTransaction
   */
  public serializeSignerSetTopic({ name, description, deadline, seq, account, threshold, lists }): ISignerSetTopic {
    const data = {
      type: MEMO_TYPE.MULTI_SIGN,
      template: SIGNER_SET_TEMPLATE.name,
      chainId: this.chainId,
      topic: {
        name,
        description,
        deadline,
        operation: {
          chainId: this.chainId,
          account,
          seq,
          threshold,
          lists
        }
      }
    };
    invariant(this.isSignerSetTopic(data), "The topic includes invalid value");
    return data;
  }

  /**
   * 序列化投票
   *
   * @param {*} {
   *     account, 多签成员地址
   *
   *     deadline,
   *
   *     multiSign, multiSign接口返回结果
   *   }
   * @returns
   * @memberof MultiSignTransaction
   */
  public serializeVote({ account, deadline, multiSign }) {
    const data = {
      type: MEMO_TYPE.ORACLE,
      action: ActionType.MULTI_SIGN,
      chainId: this.chainId,
      account,
      deadline,
      multiSign
    };
    invariant(this.isVote(data), "The vote includes invalid value");
    return data;
  }

  /**
   * 序列化注册
   *
   * @param {*} account
   * @returns
   * @memberof MultiSignTransaction
   */
  public serializeRegister(account) {
    const data = {
      type: MEMO_TYPE.NAME_SERVICE,
      action: ActionType.REGISTER,
      account,
      caregory: ActionType.MULTI_SIGN
    };
    invariant(this.isRegisterAction(data), "The register action includes invalid value");
    return data;
  }

  /**
   * 序列化注销
   *
   * @param {*} account
   * @returns
   * @memberof MultiSignTransaction
   */
  public serializeUnregister(account) {
    const data = {
      type: MEMO_TYPE.NAME_SERVICE,
      action: ActionType.UNREGISTER,
      account,
      caregory: ActionType.MULTI_SIGN
    };
    invariant(this.isUnregisterAction(data), "The unregister action includes invalid value");
    return data;
  }

  /**
   * 序列化payload
   *
   * @param {*} {total, number, payload}
   * @returns {IPayload}
   * @memberof MultiSignTransaction
   */
  public serializePayload({ total, number, payload }): IPayload {
    const data = {
      type: MEMO_TYPE.PAYLOAD,
      total,
      number,
      payload
    };
    invariant(this.isPayload(data), "The payload includes invalid value");
    return data;
  }

  /**
   * 是否是多签注册登记
   *
   * @param {*} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isRegisterAction(data): boolean {
    const { type, action, account, category } = data || {};
    return (
      type === MEMO_TYPE.NAME_SERVICE &&
      action === ActionType.REGISTER &&
      wallet.isValidAddress(account) &&
      category === ActionType.MULTI_SIGN
    );
  }

  /**
   * 是否是多签注销登记
   *
   * @param {*} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isUnregisterAction(data): boolean {
    const { type, action, account, category } = data || {};
    return (
      type === MEMO_TYPE.NAME_SERVICE &&
      action === ActionType.UNREGISTER &&
      wallet.isValidAddress(account) &&
      category === ActionType.MULTI_SIGN
    );
  }

  /**
   * 是否是转账topic
   *
   * @param {*} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isPaymentTopic(data: IPaymentTopic): boolean {
    const { type, template, topic } = data || {};
    const { name, description, deadline, operation } = topic || {};
    const { chainId, from, to, seq, token } = operation || {};
    return (
      type === MEMO_TYPE.MULTI_SIGN &&
      isPositiveStr(template) &&
      data.chainId === this.chainId &&
      isPositiveStr(name) &&
      isPositiveStr(description) &&
      isPositiveInteger(deadline) &&
      chainId === this.chainId &&
      wallet.isValidAddress(from) &&
      wallet.isValidAddress(to) &&
      isPositiveInteger(seq) &&
      this.isAmount(token)
    );
  }

  /**
   * 是否是恢复密钥topic
   *
   * @param {IEnableTopic} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isEnableTopic(data: IEnableTopic): boolean {
    const { type, template, topic } = data || {};
    const { name, description, deadline, operation } = topic || {};
    const { chainId, account, seq, options } = operation || {};
    const { clear_flag } = options || {};
    return (
      type === MEMO_TYPE.MULTI_SIGN &&
      isPositiveStr(template) &&
      data.chainId === this.chainId &&
      isPositiveStr(name) &&
      isPositiveStr(description) &&
      isPositiveInteger(deadline) &&
      chainId === this.chainId &&
      wallet.isValidAddress(account) &&
      isPositiveInteger(seq) &&
      clear_flag === 4
    );
  }

  /**
   * 是否是多签成员管理topic
   *
   * @param {ISignerSetTopic} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isSignerSetTopic(data: ISignerSetTopic): boolean {
    const { type, template, topic } = data || {};
    const { name, description, deadline, operation } = topic || {};
    const { chainId, account, seq, threshold, lists } = operation || {};
    return (
      type === MEMO_TYPE.MULTI_SIGN &&
      isPositiveStr(template) &&
      data.chainId === this.chainId &&
      isPositiveStr(name) &&
      isPositiveStr(description) &&
      isPositiveInteger(deadline) &&
      chainId === this.chainId &&
      wallet.isValidAddress(account) &&
      isPositiveInteger(seq) &&
      isPositiveInteger(threshold) &&
      Array.isArray(lists) &&
      lists.every((l) => wallet.isValidAddress(l.account) && isPositiveInteger(l.weight))
    );
  }

  public isPayload(data: IPayload): boolean {
    const { type, total, number, payload } = data;
    return (
      type === MEMO_TYPE.PAYLOAD && isPositiveInteger(total) && isPositiveInteger(number) && isPositiveStr(payload)
    );
  }

  /**
   * 多签名
   *
   * @param {*} tx
   * @param {string} secret
   * @returns 交易内容及签名内容
   * @memberof MultiSignTransaction
   */
  public multiSign(tx, secret: string) {
    return wallet.multiSign(tx, secret);
  }

  /**
   * 提交多签名交易
   *
   * @param {ISubmitMultiSigned} data
   * @returns
   * @memberof MultiSignTransaction
   */
  public async submitMultiSigned(data: ISubmitMultiSigned) {
    const { node, tx } = data;

    const res = await service({
      url: node,
      method: "post",
      data: {
        method: "submit_multisigned",
        params: [
          {
            tx_json: tx
          }
        ]
      }
    });
    return res;
  }

  private isBaseMultisign(data: IBaseMultisignTx): boolean {
    const { Flags, Fee, TransactionType, Account, Sequence, SigningPubKey, Signers } = data || {};

    return (
      Number.isInteger(Flags) &&
      new BigNumber(Fee).isPositive() &&
      isPositiveStr(TransactionType) &&
      wallet.isValidAddress(Account) &&
      Number.isInteger(Sequence) &&
      Sequence >= 0 &&
      SigningPubKey === "" &&
      Array.isArray(Signers) &&
      Signers.length === 1 &&
      Signers.every(
        (s) =>
          wallet.isValidAddress(s?.Signer?.Account) &&
          isPositiveStr(s?.Signer?.SigningPubKey) &&
          isPositiveStr(s?.Signer?.TxnSignature)
      )
    );
  }

  /**
   * 是否是投票信息
   *
   * @param {*} data
   * @returns {boolean}
   * @memberof MultiSignTransaction
   */
  public isVote(data): boolean {
    const { type, action, chainId, account, deadline, multiSign } = data || {};
    return (
      type === MEMO_TYPE.ORACLE &&
      chainId === this.chainId &&
      action === ActionType.MULTI_SIGN &&
      wallet.isValidAddress(account) &&
      isPositiveInteger(deadline) &&
      this.isBaseMultisign(multiSign)
    );
  }

  /**
   * 转账
   *
   * @param {IMultiTransfer} data
   * @returns {Promise<string>}
   * @memberof MultiSignTransaction
   */
  public async transfer(data: IMultiTransfer): Promise<string> {
    const hash = await transfer(
      Object.assign({}, data, {
        currency: this.token.currency,
        value: this.token.value,
        issuer: this.token.issuer
      })
    );
    return hash;
  }
}
