import { IBaseMultisignTx } from "../types";
import { ITopics, TopicStatus } from "../types/db";
import BaseDB from "./base-db";
import LowWithLodash from "./low";

export default class MultiSignAccountsDB extends BaseDB {
  public db: LowWithLodash<ITopics>;

  constructor(file: string) {
    super(file);
    this.db = new LowWithLodash<ITopics>(this.adapter);
  }

  private initData() {
    this.db.data = Object.assign(
      {
        topics: [],
        signs: []
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

  /**
   * 插入topic
   *
   * @param {*} data
   * @memberof MultiSignAccountsDB
   */
  insertTopic(data) {
    const topics = this.db.chain.get("topics").value();
    topics.push(data);
  }

  /**
   * 插入签名
   *
   * @param {*} data
   * @memberof MultiSignAccountsDB
   */
  insertSign(data) {
    const signs = this.db.chain.get("signs").value();
    signs.push(data);
  }

  /**
   * 未执行topics
   *
   * @returns
   * @memberof MultiSignAccountsDB
   */
  unexecutedTopics() {
    return this.db.chain
      .get("topics")
      .filter({
        executeStatus: TopicStatus.UNEXECUTED
      })
      .value();
  }

  /**
   * 更新topic status & hash
   *
   * @param {number} seq
   * @param {TopicStatus} status
   * @param {string} hash
   * @memberof MultiSignAccountsDB
   */
  updateTopic(seq: number, status: TopicStatus, hash: string) {
    const topic = this.db.chain
      .get("topics")
      .find((t) => t.data.seq === seq)
      .value();
    topic.executeStatus = status;
    topic.hash = hash;
  }

  /**
   * 成功的topics
   *
   * @returns
   * @memberof MultiSignAccountsDB
   */
  successfulTopics() {
    return this.db.chain
      .get("topics")
      .filter({
        executeStatus: TopicStatus.SUCCESS
      })
      .value();
  }

  /**
   * 失败的topics
   *
   * @returns
   * @memberof MultiSignAccountsDB
   */
  failedTopics() {
    return this.db.chain
      .get("topics")
      .filter({
        executeStatus: TopicStatus.FAIL
      })
      .value();
  }

  /**
   * 根据seq获取所有签名
   *
   * @param {number} seq
   * @returns {IBaseMultisignTx[]}
   * @memberof MultiSignAccountsDB
   */
  filterSignsBySeq(seq: number): IBaseMultisignTx[] {
    return this.db.chain
      .get("signs")
      .filter({
        Sequence: seq
      })
      .value();
  }
}
