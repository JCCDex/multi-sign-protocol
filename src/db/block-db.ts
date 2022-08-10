import { IBlock } from "../types/db";
import BaseDB from "./base-db";
import LowWithLodash from "./low";

export default class MultiSignAccountsDB extends BaseDB {
  public db: LowWithLodash<IBlock>;

  constructor(file: string) {
    super(file);
    this.db = new LowWithLodash<IBlock>(this.adapter);
  }

  private initData() {
    this.db.data = Object.assign(
      {
        block: null
      },
      this.db.data
    );
  }

  public async read() {
    await this.db.read();
    this.initData();
  }

  async updateBlock(value: number) {
    this.db.data.block = value;
  }

  async write() {
    await this.db.write();
  }

  block(): number {
    return this.db.chain.get("block").value();
  }
}
