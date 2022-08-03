import { test, describe, expect } from "@jest/globals";
import MultiSignTransaction from "../src/multi-sign-transaction";

describe("test MultiSignTransaction", () => {
  const multiSignTransaction = new MultiSignTransaction({
    currency: "SWT",
    issuer: "",
    value: "1"
  });

  describe("test isPaymentTopic & serializePaymentTopic API", () => {
    test("data is payment topic", async () => {
      const data = {
        type: "multi-sign",
        template: "转账",
        chainId: "0x8000013b",
        topic: {
          name: "奖励Bob 200USDT",
          description: "鉴于Bob发现并报告了软件中的BUG，特此奖励",
          deadline: 1658129891,
          operation: {
            chainId: "0x8000013b",
            from: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
            to: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
            seq: 45,
            token: {
              currency: "JUSDT",
              value: "200",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
            }
          }
        }
      };
      const d = multiSignTransaction.serializePaymentTopic({
        name: "奖励Bob 200USDT",
        description: "鉴于Bob发现并报告了软件中的BUG，特此奖励",
        deadline: 1658129891,
        from: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        to: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
        seq: 45,
        token: {
          currency: "JUSDT",
          value: "200",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        }
      });

      expect(d).toEqual(data);

      expect(multiSignTransaction.isPaymentTopic(d)).toEqual(true);
    });
  });

  describe("test isEnableTopic & serializeEnableTopic API", () => {
    test("data is enable topic", async () => {
      const data = {
        type: "multi-sign",
        template: "恢复密钥",
        chainId: "0x8000013b",
        topic: {
          name: "恢复密钥",
          description: "恢复jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp钱包密钥",
          deadline: 1658129891,
          operation: {
            chainId: "0x8000013b",
            account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
            seq: 45,
            options: {
              clear_flag: 4
            }
          }
        }
      };

      const d = multiSignTransaction.serializeEnableTopic({
        name: "恢复密钥",
        description: "恢复jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp钱包密钥",
        deadline: 1658129891,
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        seq: 45
      });

      expect(d).toEqual(data);

      expect(multiSignTransaction.isEnableTopic(d)).toEqual(true);
    });
  });

  describe("test isSignerSetTopic & serializeSignerSetTopic API", () => {
    test("data is signer set topic", async () => {
      const data = {
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
            seq: 45,
            threshold: 2,
            lists: [
              {
                account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
                weight: 1
              }
            ]
          }
        }
      };

      const d = multiSignTransaction.serializeSignerSetTopic({
        name: "多签成员管理",
        description: "多签成员管理",
        deadline: 1658129891,
        account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        seq: 45,
        threshold: 2,
        lists: [
          {
            account: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
            weight: 1
          }
        ]
      });
      expect(d).toEqual(data);

      expect(multiSignTransaction.isSignerSetTopic(d)).toEqual(true);
    });
  });

  describe("test isPayload API", () => {
    test("data is payload", async () => {
      const data = {
        type: "payload",
        total: 3,
        number: 1,
        payload: "010100"
      };

      expect(multiSignTransaction.isPayload(data)).toEqual(true);
    });
  });
});
