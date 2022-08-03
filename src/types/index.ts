import { IAmount } from "./common";

export interface IMultiSignOptions {
  currency: string;
  value: string;
  issuer: string;
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

export interface ISubmitMultiSigned {
  node: string;
  tx;
}
