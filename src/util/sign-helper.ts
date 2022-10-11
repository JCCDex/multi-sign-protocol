import { isDef, wallet } from "@jccdex/common";
import { IMultiSign } from "../types/tp-transfer";

const multiSign = async (data: IMultiSign) => {
  const { tx, secret } = data;
  let sign;
  if (isDef(secret)) {
    sign = wallet.multiSign(tx, secret);
  }
  return sign;
};

export default multiSign;
