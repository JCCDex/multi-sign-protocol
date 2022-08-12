export const paymentTopic = {
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
      seq: 44,
      token: {
        currency: "JUSDT",
        value: "200",
        issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
      }
    }
  }
};

export const enableTopic = {
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

export const signerTopic = {
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
          weight: 1
        }
      ]
    }
  }
};

export const signerSign = {
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
};
