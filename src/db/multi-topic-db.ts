import { IBaseMultisignTx } from "../types";
import { ISign, ITopic, ITopics, TopicStatus } from "../types/db";
import BaseDB from "./base-db";
import LowWithLodash from "./low";

export default class MultiTopicDB extends BaseDB {
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
   * @memberof MultiTopicDB
   */
  insertTopic(data: ITopic) {
    const topics = this.db.chain.get("topics").value();

    const topic = topics.find((t) => t.md5 === data?.md5);

    if (!topic) {
      topics.push(data);
    }
  }

  /**
   * 插入签名
   *
   * @param {*} data
   * @memberof MultiSignAccountsDB
   */
  insertSign(data: ISign) {
    const signs = this.db.chain.get("signs").value();

    const sign = signs.find((t) => t.md5 === data?.md5);
    if (!sign) {
      signs.push(data);
    }
  }

  /**
   * 未执行topics
   *
   * @returns
   * @memberof MultiSignAccountsDB
   */
  unexecutedTopics(): ITopic[] {
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
      .find((t) => t.data.topic.operation.seq === seq)
      .value();
    if (topic) {
      topic.executeStatus = status;
      topic.hash = hash;
    }
  }

  /**
   * 成功的topics
   *
   * @returns
   * @memberof MultiSignAccountsDB
   */
  successfulTopics(): ITopic[] {
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
  failedTopics(): ITopic[] {
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
      .filter((s) => s.data.Sequence === seq)
      .map((s) => s.data)
      .value();
  }
}
