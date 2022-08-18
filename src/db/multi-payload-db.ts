import { IPayload } from "../types";
import { IPayloadDB, IPayloads } from "../types/db";
import { isJSON, string2json } from "../util";
import BaseDB from "./base-db";

export default class MultiPayloadDB extends BaseDB<IPayloads> {
  constructor(file: string) {
    super(file);
  }

  protected initData() {
    this.db.data = Object.assign(
      {
        payloads: []
      },
      this.db.data
    );
  }

  /**
   * 插入payload
   *
   * @param {*} data
   * @memberof MultiPayloadDB
   */
  insertPayload(data: IPayloadDB) {
    const payloads = this.db.chain.get("payloads").value();

    const payload = payloads.find((p) => p.md5 === data?.md5);

    if (!payload) {
      payloads.push(data);
    }
  }

  /**
   * 根据id移除payload
   *
   * @param {*} id
   * @memberof MultiPayloadDB
   */
  removePayloadsById(id) {
    return this.db.chain
      .get("payloads")
      .remove({
        id
      })
      .value();
  }

  /**
   * 所有payload, 根据id归类
   *
   * @returns {IPayload[][]}
   * @memberof MultiPayloadDB
   */
  payloads(): IPayload[][] {
    const payloads = this.db.chain.get("payloads").value();
    const group = payloads.reduce((acc, obj) => {
      const key = obj.id;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});

    return Object.values(group);
  }

  /**
   * 判断payloads是否是完整的
   *
   * @param {IPayload[]} payloads
   * @returns {boolean}
   * @memberof MultiPayloadDB
   */
  static isWholePayload(payloads: IPayload[]): boolean {
    if (payloads.length <= 0) {
      return false;
    }

    // 相同id
    const sameId = payloads.every((p) => p.id === payloads[0].id);
    if (!sameId) {
      return false;
    }

    // 相同total
    const sameTotal = payloads.every((p) => p.total === payloads[0].total);
    if (!sameTotal) {
      return false;
    }

    const total = payloads[0].total;

    const numbers = payloads.map((p) => p.number).sort();

    const expectedIndexs = Array.from({ length: total }, (_, i) => i + 1);

    // number从1连续到total
    return numbers.length === expectedIndexs.length && numbers.every((val, i) => val === expectedIndexs[i]);
  }

  /**
   * 拼接payload
   *
   * @static
   * @param {IPayload[]} payloads
   * @returns
   * @memberof MultiPayloadDB
   */
  static parsePayload(payloads: IPayload[]) {
    const payload = payloads
      .map((p) => {
        return {
          payload: p.payload,
          number: p.number
        };
      })
      .sort((a, b) => a.number - b.number)
      .map((p) => p.payload)
      .join("");

    if (isJSON(payload)) {
      return string2json(payload);
    }
    return payload;
  }
}
