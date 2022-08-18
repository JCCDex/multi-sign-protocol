import { IMultiSignAccount, IMultisignAccounts } from "../types/db";
import BaseDB from "./base-db";

export default class MultiSignAccountsDB extends BaseDB<IMultisignAccounts> {
  constructor(file: string) {
    super(file);
  }

  private initData() {
    this.db.data = Object.assign(
      {
        accounts: []
      },
      this.db.data
    );
  }

  public async read() {
    await this.db.read();
    this.initData();
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

  /**
   * 获取账号多签成员
   *
   * @param {string} account
   * @returns {string[]}
   * @memberof MultiSignAccountsDB
   */
  signers(account: string): string[] {
    return this.db.chain
      .get("accounts")
      .find({ account })
      .get("signers")
      .map((entry) => entry.account)
      .value();
  }

  removeAccount(data: IMultiSignAccount) {
    return this.db.chain
      .get("accounts")
      .remove((a) => a.account === data.account)
      .value();
  }
}
