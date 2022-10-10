import { test, describe, expect } from "@jest/globals";
import MultiSignTransaction from "../src/multi-sign-transaction";
import { enableTopic, paymentTopic, signerTopic, createOrderTopic } from "./data";

describe("test MultiSignTransaction", () => {
  const multiSignTransaction = new MultiSignTransaction({
    token: {
      currency: "SWT",
      issuer: "",
      value: "1"
    }
  });

  describe("test isPaymentTopic & serializePaymentTopic API", () => {
    test("data is payment topic", async () => {
      const d = multiSignTransaction.serializePaymentTopic({
        name: "奖励Bob 200USDT",
        description: "鉴于Bob发现并报告了软件中的BUG，特此奖励",
        deadline: 1658129891,
        from: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        to: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
        memo: "",
        seq: 44,
        token: {
          currency: "JUSDT",
          value: "200",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      });

      expect(d).toEqual(paymentTopic);

      expect(multiSignTransaction.isPaymentTopic(d)).toEqual(true);
    });
  });

  describe("test isEnableTopic & serializeEnableTopic API", () => {
    test("data is enable topic", async () => {
      const d = multiSignTransaction.serializeEnableTopic({
        name: "恢复密钥",
        description: "恢复jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp钱包密钥",
        deadline: 1658129891,
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        seq: 45
      });

      expect(d).toEqual(enableTopic);

      expect(multiSignTransaction.isEnableTopic(d)).toEqual(true);
    });
  });

  describe("test isSignerSetTopic & serializeSignerSetTopic API", () => {
    test("data is signer set topic", async () => {
      const d = multiSignTransaction.serializeSignerSetTopic({
        name: "多签成员管理",
        description: "多签成员管理",
        deadline: 1658129891,
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        seq: 46,
        threshold: 2,
        lists: [
          {
            account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
            weight: 1
          },
          {
            account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
            weight: 1
          }
        ]
      });
      expect(d).toEqual(signerTopic);

      expect(multiSignTransaction.isSignerSetTopic(d)).toEqual(true);

      const invalidTopics = [
        {
          type: "multi-sig",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 0,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013c",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvL",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: -1,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 0,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KT",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 1
                }
              ]
            }
          }
        },
        {
          type: "multi-sign",
          template: "多签成员管理",
          chainId: "0x8000013b",
          topic: {
            name: "多签成员管理",
            description: "多签成员管理",
            deadline: 1658129891,
            operation: {
              chainId: "0x8000013b",
              account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
              seq: 46,
              threshold: 2,
              lists: [
                {
                  account: "jN2V3iXhzXZY3WjtEkgZwxyhgPwEyC3KTX",
                  weight: 1
                },
                {
                  account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                  weight: 0
                }
              ]
            }
          }
        }
      ];
      for (const topic of invalidTopics) {
        expect(multiSignTransaction.isSignerSetTopic(topic)).toEqual(false);
      }
    });
  });

  describe("te(st isCreateOrderTopic & serializeCreateOrderTopic API", () => {
    test("data is createOrder topic", async () => {
      const d = multiSignTransaction.serializeCreateOrderTopic({
        name: "用SWTC换取USDT",
        description: "缺少USDT 故用2 STWC 换取 2 USDT",
        deadline: 1658129891,
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        memo: "",
        seq: 45,
        taker_pays: {
          currency: "SWT",
          issuer: "",
          value: 2
        },
        taker_gets: {
          currency: "JUSDT",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
          value: 2
        }
      });

      expect(d).toEqual(createOrderTopic);

      expect(multiSignTransaction.isCreateOrderTopic(d)).toEqual(true);
    });
  });

  describe("test isPayload API", () => {
    test("data is payload", async () => {
      const data = {
        type: "payload",
        id: "1",
        total: 3,
        number: 1,
        payload: "010100"
      };

      expect(multiSignTransaction.isPayload(data)).toEqual(true);

      expect(
        multiSignTransaction.serializePayload({
          id: "1",
          total: 3,
          number: 1,
          payload: "010100"
        })
      ).toEqual(data);
    });
  });

  describe("test isRegisterAction ", () => {
    test("data is register", () => {
      const data = multiSignTransaction.serializeRegister("jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D");

      expect(data).toEqual({
        type: "name-service",
        action: "register",
        account: "jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D",
        category: "multiSign"
      });
    });
  });

  describe("test isUnregisterAction ", () => {
    test("data is register", () => {
      const data = multiSignTransaction.serializeUnregister("jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D");

      expect(data).toEqual({
        type: "name-service",
        action: "unregister",
        account: "jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D",
        category: "multiSign"
      });
    });
  });

  describe("test isVote API", () => {
    test("data is vote", async () => {
      const account = "jG4MZDywwxisf3G3az48cT3EamRxtbmbPB";
      const multisignMember = {
        address: "jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D",
        secret: "ssSbnZCoYbBGyMqeafUQ2esKi6nJS"
      };

      const tx = {
        Account: account,
        Amount: "0.1",
        Destination: "jMCjtHzgrMvjt2EugYsqpxKtx6Z86gKo8X",
        Fee: 0.00001,
        Flags: 0,
        TransactionType: "Payment",
        Sequence: 1
      };

      const multisigned = await multiSignTransaction.multiSign({
        tx,
        secret: multisignMember.secret
      });

      const vote = multiSignTransaction.serializeVote({
        account: multisignMember.address,
        deadline: 10000,
        multiSign: multisigned,
        md5: "eef93004736dd56b59dda11858fa1859"
      });

      expect(vote).toEqual({
        type: "oracle",
        action: "multiSign",
        chainId: "0x8000013b",
        account: "jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D",
        topicMd5: "eef93004736dd56b59dda11858fa1859",
        deadline: 10000,
        multiSign: {
          Account: "jG4MZDywwxisf3G3az48cT3EamRxtbmbPB",
          Amount: "100000",
          Destination: "jMCjtHzgrMvjt2EugYsqpxKtx6Z86gKo8X",
          Fee: "80000",
          Flags: 0,
          TransactionType: "Payment",
          Sequence: 1,
          SigningPubKey: "",
          Signers: [
            {
              Signer: {
                Account: "jMeNCYoA1YEK6t2Nb2QJTiuJcMDvUmqD8D",
                SigningPubKey: "02A4344F0DBB3C4046EB8D8A86202CCDEC87D2BA8CD537323B08CC985AED875438",
                TxnSignature:
                  "3045022100B34A6E1DA30BD7DCF43D8687870D3A7FAE4FF0F49466235AB4F38EF7116AE426022033F3D82267B72144AA5ABC17C9A3F945EF451333663AE35E3AE1902AF18AA353"
              }
            }
          ]
        }
      });
      expect(multiSignTransaction.isVote(vote)).toEqual(true);
    });
  });
});
