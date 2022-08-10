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
