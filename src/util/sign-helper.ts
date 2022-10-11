import { isDef, wallet, isPositiveStr } from "@jccdex/common";
import { IMultiSign } from "../types/tp-transfer";
import { ITokenInfo } from "../types";

export const multiSign = async (data: IMultiSign) => {
  const { tx, secret } = data;
  let sign;
  if (isDef(secret)) {
    sign = wallet.multiSign(tx, secret);
  }
  return sign;
};

export const isTokenInfos = (datas: Array<ITokenInfo>): boolean => {
  for (const d of datas) {
    const { type, data } = d;
    if (!(isPositiveStr(type) && isPositiveStr(data))) return false;
  }
  return true;
};

export const isHex64Str = (data: string): boolean => {
  const regex = /^[A-Fa-f0-9]{64}$/;
  return regex.test(data);
};

export default multiSign;
