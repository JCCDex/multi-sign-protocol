import { Transaction } from "@jccdex/jingtum-lib";
import { serializePayment } from "@jccdex/jingtum-lib/lib/tx";
import { ITPTransfer } from "../types/tp-transfer";
import wallet from "./wallet";

const tp = require("tp-js-sdk");

const sign = async (tx: any) => {
  const res = await tp.signJingtumTransaction(tx);
  if (!res.result) {
    throw new Error(res.msg);
  }
  return res.data;
};

const transfer = async (data: ITPTransfer) => {
  const { node, from, to, currency, value, issuer, memo } = data;
  const tx = serializePayment(from, value, to, currency, memo, wallet.getFee(), wallet.getCurrency(), issuer);
  const sequence = await Transaction.fetchSequence(node, from);
  tx.Sequence = sequence;
  let blob;
  if (typeof window !== "undefined" && tp.isConnected()) {
    blob = await sign(tx);
  } else {
    const res = wallet.sign(tx, data.secret);
    blob = res.blob;
  }

  const hash = await Transaction.sendRawTransaction({ blob, url: node });
  return hash;
};

export default transfer;
