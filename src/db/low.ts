import { Low } from "@commonify/lowdb";
const lodash = require("lodash");
export default class LowWithLodash<T> extends Low<T> {
  chain = lodash.chain(this).get("data");
}
