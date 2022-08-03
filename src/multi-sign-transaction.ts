import { ActionType, CHAIN_ID, MEMO_TYPE } from "./constant/type";
import { IEnableTopic, IMultiSignOptions, IPaymentTopic, ISignerSetTopic, ISubmitMultiSigned } from "./types";
import { IToken } from "./types/common";
import { isPositiveInteger, isPositiveStr } from "./util";
import wallet from "./util/wallet";
import { isValidCurrency } from "@swtc/common";
import { IAmount } from "@swtc/wallet";
import BigNumber from "bignumber.js";
import { service } from "./fetch/service";

export default class MultiSignTransaction {
  private currency: string;
  private issuer: string;
  private value: string;
  private chainId = CHAIN_ID.SWTC;

  constructor(options: IMultiSignOptions) {
    const { currency, issuer, value } = options;
    this.currency = currency;
    this.issuer = issuer;
    this.value = value;
  }

  public isNativeToken(token: IToken): boolean {
    return (
      (token?.currency?.toUpperCase() === "SWT" || token?.currency?.toUpperCase() === "SWTC") && token?.issuer === ""
    );
  }

  public isNonNativeToken(token: IToken): boolean {
    return isValidCurrency(token?.currency) && wallet.isValidAddress(token?.issuer);
  }

  public isAmount(amount: IAmount): boolean {
    return new BigNumber(amount.value).isPositive() && (this.isNativeToken(amount) || this.isNonNativeToken(amount));
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
}
