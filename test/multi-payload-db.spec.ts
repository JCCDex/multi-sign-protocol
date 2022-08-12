import { test, describe, expect } from "@jest/globals";
import { MultiPayloadDB } from "../src";
import fs from "fs";
import path from "path";

describe("test ManagementGridDB", () => {
  const file = path.join(__dirname, "./payload.json");
  const db = new MultiPayloadDB(file);
  describe("test MultiPayloadDB", () => {
    const payloads = [
      {
        type: "payload",
        total: 3,
        number: 3,
        id: "2b0d7b3dcb6d",
        md5: "1",
        payload: '1"}'
      },
      {
        type: "payload",
        total: 3,
        number: 2,
        id: "2b0d7b3dcb6d",
        md5: "2",
        payload: ':"'
      },
      {
        type: "payload",
        total: 3,
        number: 1,
        id: "2b0d7b3dcb6d",
        md5: "3",
        payload: '{"a"'
      }
    ];

    const payloads1 = [
      {
        type: "payload",
        total: 2,
        number: 1,
        id: "2b0d7b3",
        md5: "4",
        payload: "1"
      },
      {
        type: "payload",
        total: 2,
        number: 2,
        id: "2b0d7b3",
        md5: "5",
        payload: "2"
      }
    ];

    describe("test prototype function", () => {
      test("insert payloads", async () => {
        await db.read();
        for (const payload of payloads) {
          db.insertPayload(payload);
        }

        db.insertPayload(payloads[0]);

        for (const payload of payloads1) {
          db.insertPayload(payload);
        }

        expect(db.payloads()).toEqual([payloads, payloads1]);

        await db.write();
        const content = JSON.parse(fs.readFileSync(file, "utf-8"));
        expect(content).toEqual({
          payloads: [...payloads, ...payloads1]
        });
      });

      test("remove payloads", async () => {
        await db.read();

        db.removePayloadsById("2b0d7b3dcb6d");

        await db.write();

        const content = JSON.parse(fs.readFileSync(file, "utf-8"));

        expect(content).toEqual({
          payloads: payloads1
        });

        fs.unlinkSync(file);
      });
    });

    describe("test static function", () => {
      test("parsePayload", () => {
        expect(MultiPayloadDB.parsePayload(payloads)).toEqual({ a: "1" });
        expect(MultiPayloadDB.parsePayload(payloads1)).toEqual("12");
      });

      test("isWholePaylods", () => {
        expect(MultiPayloadDB.isWholePayload(payloads)).toEqual(true);
        expect(MultiPayloadDB.isWholePayload(payloads1)).toEqual(true);

        const invalidPayloads = [
          [],
          [
            {
              type: "payload",
              total: 2,
              number: 1,
              id: "2b0d7b345",
              payload: "1"
            },
            {
              type: "payload",
              total: 2,
              number: 2,
              id: "2b0d7b3",
              payload: "2"
            }
          ],
          [
            {
              type: "payload",
              total: 2,
              number: 1,
              id: "2b0d7b3",
              payload: "1"
            },
            {
              type: "payload",
              total: 3,
              number: 2,
              id: "2b0d7b3",
              payload: "2"
            }
          ],
          [
            {
              type: "payload",
              total: 2,
              number: 1,
              id: "2b0d7b3",
              payload: "1"
            }
          ],
          [
            {
              type: "payload",
              total: 2,
              number: 1,
              id: "2b0d7b3",
              payload: "1"
            },
            {
              type: "payload",
              total: 2,
              number: 3,
              id: "2b0d7b3",
              payload: "2"
            }
          ],
          [
            {
              type: "payload",
              total: 2,
              number: 1,
              id: "2b0d7b3",
              payload: "1"
            },
            {
              type: "payload",
              total: 2,
              number: 2,
              id: "2b0d7b3",
              payload: "2"
            },
            {
              type: "payload",
              total: 2,
              number: 3,
              id: "2b0d7b3",
              payload: "2"
            }
          ]
        ];

        for (const payloads of invalidPayloads) {
          expect(MultiPayloadDB.isWholePayload(payloads)).toEqual(false);
        }
      });
    });
  });
});
