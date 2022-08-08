import { IAccountObjects } from ".";

export interface IMultiSignAccount extends IAccountObjects {
  account: string;
}

export interface IMultisignAccounts {
  block: number;
  accounts: IMultiSignAccount[];
}
