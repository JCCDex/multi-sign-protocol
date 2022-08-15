import { test, describe, expect } from "@jest/globals";
import { MultiTopicDB, TopicStatus } from "../src";
import fs from "fs";
import path from "path";
import { enableTopic, paymentTopic, signerSign, signerTopic, signs } from "./data";

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

    test("find topic", async () => {
      await db.read();
      const topic = db.findTopicBySeq(44);
      expect(topic).toEqual(topics[0]);
    });

    test("insert sign", async () => {
      await db.read();
      db.insertSign({
        md5: MultiTopicDB.md5(JSON.stringify(signerSign)),
        data: signerSign as any
      });
      db.insertSign({
        md5: MultiTopicDB.md5(JSON.stringify(signerSign)),
        data: signerSign as any
      });

      const signs = db.filterSignsBySeq(46);
      expect(signs).toEqual([signerSign]);
      await db.write();
    });

    test("sign & unsigned topics", async () => {
      await db.read();

      const signedTopics = await db.filterSignedTopics("jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt");
      expect(signedTopics).toEqual([topics[2]]);

      const unexecutedTopics = await db.filterUnsignedTopics("jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt");

      expect(unexecutedTopics).toEqual([topics[0], topics[1]]);
    });

    test("remove sign by seq", async () => {
      await db.read();
      for (const sign of signs) {
        db.insertSign(sign as any);
      }
      await db.write();
      await db.read();
      expect(db.filterSignsBySeq(94).length).toBeGreaterThan(0);
      db.removeSignsBySeq(94);
      await db.write();
      await db.read();
      expect(db.filterSignsBySeq(94)).toEqual([]);
    });
  });

  describe("test static function", () => {
    test("test matchQuorum & parseVote", () => {
      const votes = [
        {
          type: "oracle",
          action: "multiSign",
          chainId: "0x8000013b",
          account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
          deadline: 1658129891,
          multiSign: {
            Flags: 0,
            Fee: 0.00001,
            SignerEntries: [
              {
                SignerEntry: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
                  SignerWeight: 1
                }
              }
            ],
            TransactionType: "SignerListSet",
            Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
            SignerQuorum: 2,
            Sequence: 46,
            SigningPubKey: "",
            Signers: [
              {
                Signer: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
                  TxnSignature:
                    "3044022100C14362302EC5CCE39D7F9A2747195279AE6A628EE1429B5387BFC58948B455AF021F569082A5F8AC4C30F464CD22F423D29925CB667BED9BA4E9A82C1D79F9F3AF"
                }
              }
            ]
          }
        },
        {
          type: "oracle",
          action: "multiSign",
          chainId: "0x8000013b",
          account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
          deadline: 1658129891,
          multiSign: {
            Flags: 0,
            Fee: 0.00001,
            SignerEntries: [
              {
                SignerEntry: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
                  SignerWeight: 1
                }
              }
            ],
            TransactionType: "SignerListSet",
            Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
            SignerQuorum: 2,
            Sequence: 46,
            SigningPubKey: "",
            Signers: [
              {
                Signer: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
                  TxnSignature:
                    "3044022100C14362302EC5CCE39D7F9A2747195279AE6A628EE1429B5387BFC58948B455AF021F569082A5F8AC4C30F464CD22F423D29925CB667BED9BA4E9A82C1D79F9F3AF"
                }
              }
            ]
          }
        },
        {
          type: "oracle",
          action: "multiSign",
          chainId: "0x8000013b",
          account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
          deadline: 1658129891,
          multiSign: {
            Flags: 0,
            Fee: 0.00001,
            SignerEntries: [
              {
                SignerEntry: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
                  SignerWeight: 1
                }
              },
              {
                SignerEntry: {
                  Account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
                  SignerWeight: 1
                }
              }
            ],
            TransactionType: "SignerListSet",
            Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
            SignerQuorum: 2,
            Sequence: 46,
            SigningPubKey: "",
            Signers: [
              {
                Signer: {
                  Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
                  SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
                  TxnSignature:
                    "3044022100C14362302EC5CCE39D7F9A2747195279AE6A628EE1429B5387BFC58948B455AF021F569082A5F8AC4C30F464CD22F423D29925CB667BED9BA4E9A82C1D79F9F3AF"
                }
              }
            ]
          }
        }
      ];

      const signers = [
        {
          account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
          weight: 1
        },
        {
          account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
          weight: 1
        },
        {
          account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
          weight: 1
        }
      ];

      const matchVotes = MultiTopicDB.filterSignsBySigner(votes, signers);

      expect(MultiTopicDB.matchQuorum(matchVotes, signers, 2)).toEqual(true);
      expect(MultiTopicDB.matchQuorum(matchVotes, signers, 3)).toEqual(false);

      expect(MultiTopicDB.parseVote(matchVotes)).toEqual({
        Flags: 0,
        Fee: 0.00001,
        SignerEntries: [
          {
            SignerEntry: {
              Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
              SignerWeight: 1
            }
          },
          {
            SignerEntry: {
              Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
              SignerWeight: 1
            }
          },
          {
            SignerEntry: {
              Account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
              SignerWeight: 1
            }
          }
        ],
        TransactionType: "SignerListSet",
        Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
        SignerQuorum: 2,
        Sequence: 46,
        SigningPubKey: "",
        Signers: [
          {
            Signer: {
              Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
              SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
              TxnSignature:
                "3044022100C14362302EC5CCE39D7F9A2747195279AE6A628EE1429B5387BFC58948B455AF021F569082A5F8AC4C30F464CD22F423D29925CB667BED9BA4E9A82C1D79F9F3AF"
            }
          },
          {
            Signer: {
              Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
              SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
              TxnSignature:
                "3044022100C14362302EC5CCE39D7F9A2747195279AE6A628EE1429B5387BFC58948B455AF021F569082A5F8AC4C30F464CD22F423D29925CB667BED9BA4E9A82C1D79F9F3AF"
            }
          }
        ]
      });
    });
  });
});
