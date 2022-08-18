import { JSONFile } from "@commonify/lowdb";
import LowWithLodash from "./low";

const md5 = require("spark-md5");

export default class BaseDB<T> {
  protected adapter;
  public db: LowWithLodash<T>;

  constructor(file: string) {
    this.adapter = new JSONFile(file);
    this.db = new LowWithLodash<T>(this.adapter);
  }

  static md5(msg: string): string {
    return md5.hash(msg);
  }
}
