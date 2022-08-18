import { Adapter } from "@commonify/lowdb";
import { TextFile } from "@commonify/lowdb";

export class MinifyJSONFile<T> implements Adapter<T> {
  #adapter: TextFile;

  constructor(filename: string) {
    this.#adapter = new TextFile(filename);
  }

  async read(): Promise<T | null> {
    const data = await this.#adapter.read();
    if (data === null) {
      return null;
    } else {
      return JSON.parse(data) as T;
    }
  }

  write(obj: T): Promise<void> {
    return this.#adapter.write(JSON.stringify(obj));
  }
}
