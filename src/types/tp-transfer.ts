export interface ITPTransfer {
  node: string;
  // 非tp环境secret
  secret?: string;
  from: string;
  to: string;
  value: string;
  currency: string;
  issuer: string;
  memo: string;
}

export interface IMultiTransfer {
  node: string;
  // 非tp环境secret
  secret?: string;
  from: string;
  to: string;
  memo: string;
}

export interface IMultiSign {
  tx: any;

  secret?: string;
}
