import LowWithLodash from "./low";
import { MinifyJSONFile } from "./MinifyJSONFile";

const md5 = require("spark-md5");

export default abstract class BaseDB<T> {
  protected adapter;
  public db: LowWithLodash<T>;

  constructor(file: string) {
    this.adapter = new MinifyJSONFile(file);
    this.db = new LowWithLodash<T>(this.adapter);
  }

  static md5(msg: string): string {
    return md5.hash(msg);
  }

  protected abstract initData(): void;

  public async read() {
    await this.db.read();
    this.initData();
  }

  async write() {
    await this.db.write();
  }
}
