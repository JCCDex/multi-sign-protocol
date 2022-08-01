import { IAmount } from "./common";

export interface IMultiSignOptions {
  currency: string;
  value: string;
  issuer: string;
}

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
