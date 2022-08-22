import { Transaction } from "@jccdex/jingtum-lib";
import { serializeSignerList } from "@jccdex/jingtum-lib/lib/tx";
import { ISignerList } from "../types/tp-transfer";
import { isDef, wallet } from "@jccdex/common";

const setSignerList = async (data: ISignerList) => {
  const { node, account, secret, signers, quorum } = data;
  const tx = serializeSignerList(
    account,
    quorum,
    wallet.getFee(),
    signers.map((s) => {
      return {
        SignerEntry: {
          Account: s.account,
          SignerWeight: s.weight
        }
      };
    })
  );
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

export default setSignerList;
