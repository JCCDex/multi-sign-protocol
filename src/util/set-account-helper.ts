import { Transaction } from "@jccdex/jingtum-lib";
import { serializeSetAccount } from "@jccdex/jingtum-lib/lib/tx";
import { IAccountSet } from "../types/tp-transfer";
import { isDef, wallet } from "@jccdex/common";

const setAccount = async (data: IAccountSet) => {
  const { node, account, secret, disabled } = data;
  const tx = serializeSetAccount(account, disabled, wallet.getFee());
  const sequence = await Transaction.fetchSequence(node, account);
  tx.Sequence = sequence;
  let blob;
  if (isDef(secret)) {
    const res = wallet.sign(tx, data.secret);
    blob = res.blob;
  }

  const hash = await Transaction.sendRawTransaction({ blob, url: node });
  return hash;
};

export default setAccount;
