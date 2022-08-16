import { test, describe, expect } from "@jest/globals";
import { BlockDB } from "../src";
import fs from "fs";
import path from "path";

describe("test MultiPayloadDB", () => {
  const file = path.join(__dirname, "./block.json");
  const db = new BlockDB(file);

  describe("test prototype function", () => {
    test("update block & read", async () => {
      await db.read();
      expect(db.block()).toBeNull;
      db.updateBlock(1);
      expect(db.block()).toEqual(1);
      await db.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        block: 1
      });
      fs.unlinkSync(file);
    });
  });
});
