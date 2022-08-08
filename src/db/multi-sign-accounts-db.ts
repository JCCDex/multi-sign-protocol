import { IMultiSignAccount, IMultisignAccounts } from "../types/db";
import BaseDB from "./base-db";
import LowWithLodash from "./low";

export default class MultiSignAccountsDB extends BaseDB {
  public db: LowWithLodash<IMultisignAccounts>;

  constructor(file: string) {
    super(file);
    this.db = new LowWithLodash<IMultisignAccounts>(this.adapter);
  }

  private initData() {
    this.db.data = Object.assign(
      {
        block: null,
        accounts: []
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

  insertAccount(data: IMultiSignAccount) {
    const actions = this.db.chain.get("accounts");
    const accounts = actions.value();
    const index = actions.findIndex((a) => a.account === data.account).value();
    if (index >= 0) {
      accounts.splice(index, 1);
    }
    accounts.push(data);
  }

  accounts(): IMultiSignAccount[] {
    return this.db.chain.get("accounts").value();
  }

  block(): number {
    return this.db.chain.get("block").value();
  }

  removeAccount(data: IMultiSignAccount) {
    const actions = this.db.chain.get("accounts");
    const accounts = actions.value();
    const index = actions.findIndex((a) => a.account === data.account).value();
    if (index >= 0) {
      accounts.splice(index, 1);
    }
  }
}
