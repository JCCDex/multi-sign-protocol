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
      memo: "",
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

export const createOrderTopic = {
  type: "multi-sign",
  template: "挂单",
  chainId: "0x8000013b",
  topic: {
    name: "用SWTC换取USDT",
    description: "缺少USDT 故用2 STWC 换取 2 USDT",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
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
    }
  }
};

export const cancelOrderTopic = {
  type: "multi-sign",
  template: "撤单",
  chainId: "0x8000013b",
  topic: {
    name: "撤销换取USDT",
    description: "USDT够了 故撤销换取USDT",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      orderSeq: 46,
      seq: 47
    }
  }
};

export const setLimitTopic = {
  type: "multi-sign",
  template: "设置资产上限",
  chainId: "0x8000013b",
  topic: {
    name: "设置资产上限",
    description: "为了方便管理 故设置多签账号的资产上限为20000个SWTC",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      limit: {
        currency: "SWT",
        issuer: "",
        value: 20000
      },
      memo: "",
      seq: 48
    }
  }
};

export const setBlackListTopic = {
  type: "multi-sign",
  template: "冻结账号",
  chainId: "0x8000013b",
  topic: {
    name: "冻结账号",
    description: "因为j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j违规操作,故冻结该账号",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      blockAccount: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
      memo: "",
      seq: 49
    }
  }
};

export const removeBlackListTopic = {
  type: "multi-sign",
  template: "解冻账号",
  chainId: "0x8000013b",
  topic: {
    name: "解冻账号",
    description: "因为j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j持有人做出贡献,故解冻该账号",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      blockAccount: "j9iWN6W7bbiRnSq3zx5fm83hLJwaferH3j",
      memo: "",
      seq: 50
    }
  }
};

export const issueSetTopic = {
  type: "multi-sign",
  template: "通证发行",
  chainId: "0x8000013b",
  topic: {
    name: "通证发行",
    description: "应某超市要求，发行该超市10000000个通证",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      managerAccount: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      amount: {
        currency: "mmt",
        issuer: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
        value: 10000000
      },
      memo: "",
      seq: 51
    }
  }
};

export const setTokenIssueTopic = {
  type: "multi-sign",
  template: "NFT发行",
  chainId: "0x8000013b",
  topic: {
    name: "NFT发行",
    description: "因图片精美,故将该图片做成nft",
    deadline: 1658129891,
    operation: {
      chainId: "0x8000013b",
      account: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      publisher: "jUtvJZtgZjRrz5jFC3VKg4mrnnJfWrLvLp",
      token: "某某图片",
      number: 1,
      memo: "",
      seq: 52
    }
  }
};

export const signerSign = {
  type: "oracle",
  action: "multiSign",
  chainId: "0x8000013b",
  account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
  topicMd5: "eef93004736dd56b59dda11858fa1859",
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

export const signs = [
  {
    md5: "060cc2dc17d5be826fe41fdd1e52a318",
    data: {
      type: "oracle",
      action: "multiSign",
      chainId: "0x8000013b",
      account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
      deadline: 1661151011,
      topicMd5: "bbc670b35dbcbeac9ca0fb5e4d6dd3fb",
      multiSign: {
        Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
        Amount: "100",
        Destination: "j4rmEZiaTdXBkgzXPdsu1JRBf5onngqfUi",
        Fee: "80000",
        Flags: 0,
        Memos: [
          {
            Memo: {
              MemoData: "",
              MemoType: "737472696E67"
            }
          }
        ],
        TransactionType: "Payment",
        Sequence: 94,
        SigningPubKey: "",
        Signers: [
          {
            Signer: {
              Account: "jaLwe24yofQeejkNcBRJRsyk7Q9Y5mi2JA",
              SigningPubKey: "02A39965225C2A6128A7978BC2376DEEF93A4D7B4305B2D095EC3CC2A2A8F07010",
              TxnSignature:
                "3045022100A4448FD252D15B050CC373132A101A8ABB0AB32E85FF71E99D5F7D2A6EFB3886022007EF44C7282F7267A6C3E74DD7FDB2AA5124B3F60CF14DE2D63D64E5787B6D49"
            }
          }
        ]
      }
    }
  },
  {
    md5: "bd2673002d7aef3f24b58d5699d25885",
    data: {
      type: "oracle",
      action: "multiSign",
      chainId: "0x8000013b",
      topicMd5: "bbc670b35dbcbeac9ca0fb5e4d6dd3fb",
      account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
      deadline: 1661151011,
      multiSign: {
        Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
        Amount: "100",
        Destination: "j4rmEZiaTdXBkgzXPdsu1JRBf5onngqfUi",
        Fee: "80000",
        Flags: 0,
        Memos: [
          {
            Memo: {
              MemoData: "",
              MemoType: "737472696E67"
            }
          }
        ],
        TransactionType: "Payment",
        Sequence: 94,
        SigningPubKey: "",
        Signers: [
          {
            Signer: {
              Account: "jMETckC3Wtq2jAbrdHwbhCwLRxatboXrEt",
              SigningPubKey: "0279E5619910F550B646B1AE28ABC83CC93C184A705E21B4647E20E43BDAC98C50",
              TxnSignature:
                "304402203DE8218A7CCCFBD96244383BA326D59476CC47B8173795538257AECD239DE4EC02201F5CBA7F7C4D207B0E3072E5E9351897AF32E0DA2FE8B9E35D3967A202B3ACFC"
            }
          }
        ]
      }
    }
  },
  {
    md5: "ad31d10c29629313e7708a0764acfeba",
    data: {
      type: "oracle",
      action: "multiSign",
      chainId: "0x8000013b",
      account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
      topicMd5: "dfea99de567b1c73e3c4d72321709663",
      deadline: 1661151011,
      multiSign: {
        Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
        Amount: "100",
        Destination: "j4rmEZiaTdXBkgzXPdsu1JRBf5onngqfUi",
        Fee: "80000",
        Flags: 0,
        Memos: [
          {
            Memo: {
              MemoData: "",
              MemoType: "737472696E67"
            }
          }
        ],
        TransactionType: "Payment",
        Sequence: 94,
        SigningPubKey: "",
        Signers: [
          {
            Signer: {
              Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
              SigningPubKey: "03AA6BFD5692513492A58606761B500367D2AE80B3385CBAFB47F4606CE9FE64F8",
              TxnSignature:
                "3045022100B84759893A80EB3F7105639C3827275D56C379782BD354C578C01400920B241502204BE2B606CDB3F4B84163A2FD25D77FF9E4E7D36C9A8D93EEF3487A4AD26CED77"
            }
          }
        ]
      }
    }
  },
  {
    md5: "bbc670b35dbcbeac9ca0fb5e4d6dd3fb",
    data: {
      type: "oracle",
      action: "multiSign",
      chainId: "0x8000013b",
      account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
      topicMd5: "2cc63ceaa66be3520ec63b96c9247cf7",
      deadline: 1661151011,
      multiSign: {
        Account: "jH8kqWhBv2u4188gCvof6EK3EgQKRoKmGy",
        Amount: "10000",
        Destination: "j4rmEZiaTdXBkgzXPdsu1JRBf5onngqfUi",
        Fee: "80000",
        Flags: 0,
        Memos: [
          {
            Memo: {
              MemoData: "",
              MemoType: "737472696E67"
            }
          }
        ],
        TransactionType: "Payment",
        Sequence: 95,
        SigningPubKey: "",
        Signers: [
          {
            Signer: {
              Account: "jP3gCE8keCarT9Q25ceK3hJwhLv2wEG8Nv",
              SigningPubKey: "03AA6BFD5692513492A58606761B500367D2AE80B3385CBAFB47F4606CE9FE64F8",
              TxnSignature:
                "3045022100E9711F76022D2EB3313E8B85AB3CD93DC3EACE921033A1C40134B97AB9709ABD022009552EB1A563C1E427C92E9DA33D42F9B838E821F1804B0658BE67185D8E6535"
            }
          }
        ]
      }
    }
  }
];
