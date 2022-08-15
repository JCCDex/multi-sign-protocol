import { IBaseMultisignTx, IEnableTopic, IPayload, IPaymentTopic, ISignerSetTopic, IVote } from ".";

export interface ISignerEntry {
  account: string;
  weight: number;
}

export interface IMultiSignAccount {
  account: string;
  quorum: number;
  signers: ISignerEntry[];
}

export interface IMultisignAccounts {
  accounts: IMultiSignAccount[];
}

export interface IBlock {
  block: number;
}

export enum TopicStatus {
  // 未执行
  UNEXECUTED = 0,
  // 成功
  SUCCESS = 1,
  // 失败
  FAIL = 2,

  // 过期
  EXPIRED = 3
}

export interface ITopic {
  executeStatus: TopicStatus;
  hash: string;
  md5: string;
  data: IPaymentTopic | ISignerSetTopic | IEnableTopic;
}

export interface ISign {
  md5: string;
  data: IBaseMultisignTx;
}

export interface ITopics {
  topics: ITopic[];
  signs: IVote[];
}

export interface IPayloadDB extends IPayload {
  md5: string;
}

export interface IPayloads {
  payloads: IPayloadDB[];
}
