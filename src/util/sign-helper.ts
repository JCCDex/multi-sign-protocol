import { isDef } from ".";
import { IMultiSign } from "../types/tp-transfer";
import wallet from "./wallet";

const multiSign = async (data: IMultiSign) => {
  const { tx, secret } = data;
  let sign;
  if (isDef(secret)) {
    sign = wallet.multiSign(tx, secret);
  }
  return sign;
};

export default multiSign;
