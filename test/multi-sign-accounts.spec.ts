import { test, describe, expect } from "@jest/globals";
import { MultiSignAccountsDB } from "../src";
import fs from "fs";
import path from "path";

describe("test MultiPayloadDB", () => {
  const file = path.join(__dirname, "./accounts.json");
  const db = new MultiSignAccountsDB(file);

  describe("test prototype function", () => {
    test("insert & remove account", async () => {
      await db.read();
      expect(db.accounts()).toEqual([]);
      const data = {
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        quorum: 1,
        signers: [
          {
            account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
            weight: 1
          }
        ]
      };
      db.insertAccount(data);
      db.insertAccount(data);
      expect(db.accounts()).toEqual([data]);

      await db.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        accounts: [data]
      });

      await db.read();
      expect(db.accounts()).toEqual([data]);

      db.insertAccount({
        account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
        quorum: 1,
        signers: [
          {
            account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
            weight: 1
          }
        ]
      });

      expect(db.signers("j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j")).toEqual(["jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp"]);
      db.removeAccount(data);
      expect(db.accounts()).toEqual([
        {
          account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
          quorum: 1,
          signers: [
            {
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              weight: 1
            }
          ]
        }
      ]);

      fs.unlinkSync(file);
    });
  });
});
