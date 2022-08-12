import { test, describe, expect } from "@jest/globals";
import { MultiTopicDB, TopicStatus } from "../src";
import fs from "fs";
import path from "path";
import { enableTopic, paymentTopic, signerSign, signerTopic } from "./data";

describe("test MultiTopicDB", () => {
  const file = path.join(__dirname, "./topic.json");
  const db = new MultiTopicDB(file);
  const topics = [
    {
      executeStatus: TopicStatus.UNEXECUTED,
      hash: "",
      md5: MultiTopicDB.md5(JSON.stringify(paymentTopic)),
      data: paymentTopic
    },
    {
      executeStatus: TopicStatus.UNEXECUTED,
      hash: "",
      md5: MultiTopicDB.md5(JSON.stringify(enableTopic)),
      data: enableTopic
    },
    {
      executeStatus: TopicStatus.UNEXECUTED,
      hash: "",
      md5: MultiTopicDB.md5(JSON.stringify(signerTopic)),
      data: signerTopic
    }
  ];

  afterAll(() => {
    fs.unlinkSync(file);
  });

  describe("test prototype function", () => {
    test("insert topic", async () => {
      await db.read();
      for (const topic of topics) {
        db.insertTopic(topic);
      }
      db.insertTopic(topics[0]);
      expect(db.unexecutedTopics()).toEqual(topics);
      await db.write();
    });

    test("update topic", async () => {
      await db.read();
      db.updateTopic(45, TopicStatus.FAIL, "1");
      expect(db.failedTopics()).toEqual([Object.assign({}, topics[1], { executeStatus: TopicStatus.FAIL, hash: "1" })]);
      db.updateTopic(46, TopicStatus.SUCCESS, "2");
      expect(db.successfulTopics()).toEqual([
        Object.assign({}, topics[2], { executeStatus: TopicStatus.SUCCESS, hash: "2" })
      ]);
    });

    test("insert sign", async () => {
      await db.read();
      db.insertSign({
        md5: MultiTopicDB.md5(JSON.stringify(signerSign)),
        data: signerSign
      });
      db.insertSign({
        md5: MultiTopicDB.md5(JSON.stringify(signerSign)),
        data: signerSign
      });

      const signs = db.filterSignsBySeq(46);
      expect(signs).toEqual([signerSign]);
    });
  });

  // describe("test static function", () => {

  // });
});
