import { IBlock } from "../types/db";
import BaseDB from "./base-db";

export default class BlockDB extends BaseDB<IBlock> {
  constructor(file: string) {
    super(file);
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
