import { IBaseMultisignTx, IEnableTopic, IPaymentTopic, ISignerSetTopic } from ".";

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
  FAIL = 2
}

export interface ITopic {
  executeStatus: TopicStatus;
  hash: string;
  data: IPaymentTopic | ISignerSetTopic | IEnableTopic;
}

export interface ITopics {
  topics: ITopic[];

  signs: IBaseMultisignTx[];
}
