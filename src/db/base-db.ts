import { JSONFile } from "@commonify/lowdb";
const md5 = require("spark-md5");

export default class BaseDB {
  protected adapter;
  constructor(file: string) {
    this.adapter = new JSONFile(file);
  }

  static md5(msg: string): string {
    return md5.hash(msg);
  }
}
