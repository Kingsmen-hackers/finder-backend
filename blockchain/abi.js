export const solanaMarketAbi = {
  version: "0.1.0",
  name: "marketplace",
  constants: [
    {
      name: "TIME_TO_LOCK",
      type: "u64",
      value: "60",
    },
    {
      name: "USER_TAG",
      type: "bytes",
      value: "[85, 83, 69, 82, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "ADMIN_TAG",
      type: "bytes",
      value: "[65, 68, 77, 73, 78, 95, 84, 65, 71]",
    },
    {
      name: "STORE_TAG",
      type: "bytes",
      value: "[83, 84, 79, 82, 69, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "REQUEST_TAG",
      type: "bytes",
      value: "[82, 69, 81, 85, 69, 83, 84, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "REQUEST_PAYMENT_TAG",
      type: "bytes",
      value:
        "[82, 69, 81, 85, 69, 83, 84, 95, 80, 65, 89, 77, 69, 78, 84, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "LOCATION_PREFERENCE_TAG",
      type: "bytes",
      value:
        "[76, 79, 67, 65, 84, 73, 79, 78, 95, 80, 82, 69, 70, 69, 82, 69, 78, 67, 69, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "OFFER_TAG",
      type: "bytes",
      value: "[79, 70, 70, 69, 82, 95, 83, 84, 65, 84, 69]",
    },
    {
      name: "USER_COUNTER",
      type: "bytes",
      value: "[85, 83, 69, 82, 95, 67, 79, 85, 78, 84, 69, 82]",
    },
    {
      name: "STORE_COUNTER",
      type: "bytes",
      value: "[83, 84, 79, 82, 69, 95, 67, 79, 85, 78, 84, 69, 82]",
    },
    {
      name: "REQUEST_COUNTER",
      type: "bytes",
      value: "[82, 69, 81, 85, 69, 83, 84, 95, 67, 79, 85, 78, 84, 69, 82]",
    },
    {
      name: "REQUEST_PAYMENT_COUNTER",
      type: "bytes",
      value:
        "[82, 69, 81, 85, 69, 83, 84, 95, 80, 65, 89, 77, 69, 78, 84, 95, 67, 79, 85, 78, 84, 69, 82]",
    },
    {
      name: "OFFER_COUNTER",
      type: "bytes",
      value: "[79, 70, 70, 69, 82, 95, 67, 79, 85, 78, 84, 69, 82]",
    },
  ],
  instructions: [
    {
      name: "initializeCounters",
      accounts: [
        {
          name: "userCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "storeCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offerCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initializeCountersPay",
      accounts: [
        {
          name: "requestPaymentCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createUser",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "username",
          type: "string",
        },
        {
          name: "phone",
          type: "string",
        },
        {
          name: "latitude",
          type: "i128",
        },
        {
          name: "longitude",
          type: "i128",
        },
        {
          name: "accountType",
          type: {
            defined: "AccountType",
          },
        },
      ],
    },
    {
      name: "updateUser",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "username",
          type: "string",
        },
        {
          name: "phone",
          type: "string",
        },
        {
          name: "latitude",
          type: "i128",
        },
        {
          name: "longitude",
          type: "i128",
        },
        {
          name: "accountType",
          type: {
            defined: "AccountType",
          },
        },
      ],
    },
    {
      name: "createStore",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "store",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "storeCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "phone",
          type: "string",
        },
        {
          name: "latitude",
          type: "i128",
        },
        {
          name: "longitude",
          type: "i128",
        },
      ],
    },
    {
      name: "createRequest",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "images",
          type: {
            vec: "string",
          },
        },
        {
          name: "latitude",
          type: "i128",
        },
        {
          name: "longitude",
          type: "i128",
        },
      ],
    },
    {
      name: "deleteRequest",
      accounts: [
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "markRequestAsCompleted",
      accounts: [
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "checkPrice",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "priceUpdate",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "payForRequestToken",
      accounts: [
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestPaymentInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestPaymentCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "fromAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "toAta",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "priceUpdate",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mint",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "coin",
          type: {
            defined: "CoinPayment",
          },
        },
      ],
    },
    {
      name: "payForRequest",
      accounts: [
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestPaymentInfo",
          isMut: true,
          isSigner: false,
        },
        {
          name: "requestPaymentCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "to",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "coin",
          type: {
            defined: "CoinPayment",
          },
        },
      ],
    },
    {
      name: "toggleLocation",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "enabled",
          type: "bool",
        },
      ],
    },
    {
      name: "getLocationPreference",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
      returns: "bool",
    },
    {
      name: "createOffer",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "offer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "offerCounter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "price",
          type: "u64",
        },
        {
          name: "images",
          type: {
            vec: "string",
          },
        },
        {
          name: "storeName",
          type: "string",
        },
      ],
    },
    {
      name: "acceptOffer",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: false,
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "offer",
          isMut: true,
          isSigner: false,
        },
        {
          name: "request",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "User",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "u64",
          },
          {
            name: "username",
            type: "string",
          },
          {
            name: "phone",
            type: "string",
          },
          {
            name: "location",
            type: {
              defined: "Location",
            },
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "updatedAt",
            type: "i64",
          },
          {
            name: "accountType",
            type: {
              defined: "AccountType",
            },
          },
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "locationEnabled",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "Store",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "phone",
            type: "string",
          },
          {
            name: "location",
            type: {
              defined: "Location",
            },
          },
        ],
      },
    },
    {
      name: "Request",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "buyerId",
            type: "u64",
          },
          {
            name: "description",
            type: "string",
          },
          {
            name: "images",
            type: {
              vec: "string",
            },
          },
          {
            name: "sellersPriceQuote",
            type: "u64",
          },
          {
            name: "sellerIds",
            type: {
              vec: "u64",
            },
          },
          {
            name: "offerIds",
            type: {
              vec: "u64",
            },
          },
          {
            name: "lockedSellerId",
            type: "u64",
          },
          {
            name: "location",
            type: {
              defined: "Location",
            },
          },
          {
            name: "createdAt",
            type: "u64",
          },
          {
            name: "updatedAt",
            type: "u64",
          },
          {
            name: "lifecycle",
            type: {
              defined: "RequestLifecycle",
            },
          },
          {
            name: "paid",
            type: "bool",
          },
          {
            name: "acceptedOfferId",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Offer",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "id",
            type: "u64",
          },
          {
            name: "requestId",
            type: "u64",
          },
          {
            name: "price",
            type: "u64",
          },
          {
            name: "images",
            type: {
              vec: "string",
            },
          },
          {
            name: "storeName",
            type: "string",
          },
          {
            name: "sellerId",
            type: "u64",
          },
          {
            name: "isAccepted",
            type: "bool",
          },
          {
            name: "createdAt",
            type: "u64",
          },
          {
            name: "updatedAt",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "RequestPaymentTransaction",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "requestId",
            type: "u64",
          },
          {
            name: "buyerId",
            type: "u64",
          },
          {
            name: "price",
            type: "u64",
          },
          {
            name: "sellerId",
            type: "u64",
          },
          {
            name: "sellerAuthority",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "u64",
          },
          {
            name: "updatedAt",
            type: "u64",
          },
          {
            name: "token",
            type: {
              defined: "CoinPayment",
            },
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "id",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "Counter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "current",
            type: "u64",
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Location",
      type: {
        kind: "struct",
        fields: [
          {
            name: "latitude",
            type: "i128",
          },
          {
            name: "longitude",
            type: "i128",
          },
        ],
      },
    },
    {
      name: "AccountType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Buyer",
          },
          {
            name: "Seller",
          },
        ],
      },
    },
    {
      name: "RequestLifecycle",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Pending",
          },
          {
            name: "AcceptedBySeller",
          },
          {
            name: "AcceptedByBuyer",
          },
          {
            name: "RequestLocked",
          },
          {
            name: "Paid",
          },
          {
            name: "Completed",
          },
        ],
      },
    },
    {
      name: "CoinPayment",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Solana",
          },
          {
            name: "Pyusdt",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "StoreCreated",
      fields: [
        {
          name: "sellerAddress",
          type: "publicKey",
          index: false,
        },
        {
          name: "storeId",
          type: "u64",
          index: false,
        },
        {
          name: "storeName",
          type: "string",
          index: false,
        },
        {
          name: "latitude",
          type: "i128",
          index: false,
        },
        {
          name: "longitude",
          type: "i128",
          index: false,
        },
      ],
    },
    {
      name: "RequestCreated",
      fields: [
        {
          name: "requestId",
          type: "u64",
          index: false,
        },
        {
          name: "buyerAddress",
          type: "publicKey",
          index: false,
        },
        {
          name: "requestName",
          type: "string",
          index: false,
        },
        {
          name: "latitude",
          type: "i128",
          index: false,
        },
        {
          name: "longitude",
          type: "i128",
          index: false,
        },
        {
          name: "images",
          type: {
            vec: "string",
          },
          index: false,
        },
        {
          name: "lifecycle",
          type: "u8",
          index: false,
        },
        {
          name: "description",
          type: "string",
          index: false,
        },
        {
          name: "buyerId",
          type: "u64",
          index: false,
        },
        {
          name: "sellerIds",
          type: {
            vec: "u64",
          },
          index: false,
        },
        {
          name: "sellersPriceQuote",
          type: "u64",
          index: false,
        },
        {
          name: "lockedSellerId",
          type: "u64",
          index: false,
        },
        {
          name: "createdAt",
          type: "u64",
          index: false,
        },
        {
          name: "updatedAt",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "OfferCreated",
      fields: [
        {
          name: "offerId",
          type: "u64",
          index: false,
        },
        {
          name: "sellerAddress",
          type: "publicKey",
          index: false,
        },
        {
          name: "storeName",
          type: "string",
          index: false,
        },
        {
          name: "price",
          type: "u64",
          index: false,
        },
        {
          name: "requestId",
          type: "u64",
          index: false,
        },
        {
          name: "images",
          type: {
            vec: "string",
          },
          index: false,
        },
        {
          name: "sellerId",
          type: "u64",
          index: false,
        },
        {
          name: "sellerIds",
          type: {
            vec: "u64",
          },
          index: false,
        },
      ],
    },
    {
      name: "RequestAccepted",
      fields: [
        {
          name: "requestId",
          type: "u64",
          index: false,
        },
        {
          name: "offerId",
          type: "u64",
          index: false,
        },
        {
          name: "sellerId",
          type: "u64",
          index: false,
        },
        {
          name: "updatedAt",
          type: "u64",
          index: false,
        },
        {
          name: "sellersPriceQuote",
          type: "u64",
          index: false,
        },
      ],
    },
    {
      name: "OfferAccepted",
      fields: [
        {
          name: "offerId",
          type: "u64",
          index: false,
        },
        {
          name: "buyerAddress",
          type: "publicKey",
          index: false,
        },
        {
          name: "isAccepted",
          type: "bool",
          index: false,
        },
      ],
    },
    {
      name: "LocationEnabled",
      fields: [
        {
          name: "userId",
          type: "u64",
          index: false,
        },
        {
          name: "locationEnabled",
          type: "bool",
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "UserAlreadyExists",
      msg: "User already exists.",
    },
    {
      code: 6001,
      name: "InvalidAccountType",
      msg: "Invalid account type.",
    },
    {
      code: 6002,
      name: "InvalidUser",
      msg: "Invalid user.",
    },
    {
      code: 6003,
      name: "OnlySellersAllowed",
      msg: "Only sellers allowed.",
    },
    {
      code: 6004,
      name: "OnlyBuyersAllowed",
      msg: "Only buyers allowed.",
    },
    {
      code: 6005,
      name: "UnauthorizedBuyer",
      msg: "Unauthorized buyer.",
    },
    {
      code: 6006,
      name: "OfferAlreadyAccepted",
      msg: "Offer already accepted.",
    },
    {
      code: 6007,
      name: "RequestLocked",
      msg: "Request locked.",
    },
    {
      code: 6008,
      name: "IncorrectNumberOfSellers",
      msg: "Incorrect number of sellers.",
    },
    {
      code: 6009,
      name: "RequestNotAccepted",
      msg: "Request not accepted.",
    },
    {
      code: 6010,
      name: "RequestNotLocked",
      msg: "Request not locked.",
    },
    {
      code: 6011,
      name: "InvalidSeller",
      msg: "Invalid seller.",
    },
    {
      code: 6012,
      name: "InvalidCoinPayment",
      msg: "Invalid coin payment.",
    },
    {
      code: 6013,
      name: "RequestAlreadyPaid",
      msg: "request already paid.",
    },
    {
      code: 6014,
      name: "RequestNotPaid",
      msg: "request not paid.",
    },
  ],
  metadata: {
    address: "gSh52u5Nt39rb8CSHQhUhF1cSdFsL9JebSoPZmazFrZ",
  },
};
