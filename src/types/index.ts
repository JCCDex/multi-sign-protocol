import { IAmount } from "@jccdex/common";
import { ISignerEntry } from "./db";

export interface IMultiSignOptions {
  token: IAmount;
}

/**
 * 转账topic
 *
 * @export
 * @interface IPaymentTopic
 */
export interface IPaymentTopic {
  type: string;
  template: string;
  chainId: string;
  topic: {
    name: string;
    description: string;
    deadline: number;
    operation: {
      chainId: string;
      memo: string;
      from: string;
      to: string;
      seq: number;
      token: IAmount;
    };
  };
}

/**
 * 恢复密钥topic
 *
 * @export
 * @interface IEnableTopic
 */
export interface IEnableTopic {
  type: string;
  template: string;
  chainId: string;
  topic: {
    name: string;
    description: string;
    deadline: number;
    operation: {
      chainId: string;
      account: string;
      seq: number;
      options: {
        clear_flag: number;
      };
    };
  };
}

export interface IAccountWeight {
  account: string;
  weight: number;
}

/**
 * 多签成员topic
 *
 * @export
 * @interface ISignerSetTopic
 */
export interface ISignerSetTopic {
  type: string;
  template: string;
  chainId: string;
  topic: {
    name: string;
    description: string;
    deadline: number;
    operation: {
      chainId: string;
      account: string;
      seq: number;
      threshold: number;
      lists: IAccountWeight[];
    };
  };
}

export interface IVote {
  type: string;
  action: string;
  chainId: string;
  account: string;
  deadline: number;
  multiSign: IBaseMultisignTx;
}

export interface IPayload {
  type: string;
  id: string;
  total: number;
  number: number;
  payload: string;
}

export interface ISubmitMultiSigned {
  node: string;
  tx;
}

export interface ISigner {
  Signer: {
    Account: string;
    SigningPubKey: string;
    TxnSignature: string;
  };
}

export interface IBaseMultisignTx {
  Flags: number;
  Fee: number | string;
  TransactionType: string;
  Sequence: number;
  SigningPubKey: string;
  Account: string;
  Signers: ISigner[];
}

export interface IAccountObjects {
  signers: ISignerEntry[];
  quorum: number;
}
