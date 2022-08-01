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
