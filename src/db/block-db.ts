import { IBlock } from "../types/db";
import BaseDB from "./base-db";

export default class BlockDB extends BaseDB<IBlock> {
  constructor(file: string) {
    super(file);
  }

  protected initData() {
    this.db.data = Object.assign(
      {
        block: null
      },
      this.db.data
    );
  }

  async updateBlock(value: number) {
    this.db.data.block = value;
  }

  block(): number {
    return this.db.chain.get("block").value();
  }
}
