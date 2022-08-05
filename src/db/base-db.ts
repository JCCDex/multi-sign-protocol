import { JSONFile } from "@commonify/lowdb";

export default class BaseDB {
  protected adapter;
  constructor(file: string) {
    this.adapter = new JSONFile(file);
  }
}
