import { test, describe, expect } from "@jest/globals";
import MultiSignTransaction from "../src/multi-sign-transaction";

describe("test MultiSignTransaction", () => {
  const multiSignTransaction = new MultiSignTransaction({
    currency: "SWT",
    issuer: "",
    value: "1"
  });

  describe("test isPaymentTopic API", () => {
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

      expect(multiSignTransaction.isPaymentTopic(data)).toEqual(true);
    });
  });
});
