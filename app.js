import { Connection } from "@solana/web3.js";
import { solanaMarketAbi } from "./blockchain/abi.js";
import { programID } from "./utils/constants.js";
import { BorshCoder } from "@project-serum/anchor";
import { CoinDecimals } from "./types/index.js";
import { paymentModel } from "./models/paymentinfo.model.js";
import { RequestModel } from "./models/Request.model.js";
import { OfferModel } from "./models/Offer.model.js";
import { UserCreatedModel } from "./models/UserCreated.model.js";
import { isWithinThreshold, threshold } from "./location.js";
import { matchContract, GET_MONGO_URI } from "./base.js";
import { RequestPaymentTransactedModel } from "./models/RequestPaymentTransacted.model.js";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { getMarketPlaceEvents } from "./indexer.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5100;
app.use(cors());
app.use(bodyParser.json());

function connectWithRetry() {
  mongoose
    .connect(GET_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.error(
        "Failed to connect to MongoDB, retrying in 5 seconds...",
        err
      );
      setTimeout(connectWithRetry, 5000);
    });
  mongoose.set("debug", process.env.NODE_ENV != "production");
}

connectWithRetry();

app.get("/requests/:buyerAddress", async (req, res) => {
  try {
    const buyers = await RequestModel.find({
      buyerAddress: {
        $regex: new RegExp(`^${req.params.buyerAddress}$`, "i"),
      },
    });

    return res.json(buyers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/offers/:requestId", async (req, res) => {
  try {
    const offers = await OfferModel.find({
      requestId: req.params.requestId,
    });

    return res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/offers/:sellerAddress", async (req, res) => {
  try {
    const offers = await OfferModel.find({
      sellerAddress: req.params.sellerAddress,
    });

    return res.json(offers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
app.get("/requestId/:id", async (req, res) => {
  try {
    const request = await RequestModel.find({
      requestId: req.params.id,
    });

    return res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post("/requests", async (req, res) => {
  const { sellerLat, sellerLong } = req.body;
  try {
    const requests = await RequestModel.find();
    const availableRequests = [];
    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      const { latitude, longitude } = request;
      const isAvailable = isWithinThreshold(
        latitude,
        longitude,
        sellerLat,
        sellerLong,
        threshold
      );
      if (isAvailable) {
        availableRequests.push(request);
      }
    }

    return res.json(availableRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userInfo = await UserCreatedModel.findOne({
      userId: userId,
    });

    const userData = await matchContract.methods
      .users(userInfo.userAddress)
      .call();

    return res.json({ ...userData, userAddress: userInfo.userAddress });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/accepted-requests/:sellerAddress", async (req, res) => {
  try {
    const { sellerAddress } = req.params;

    const acceptedRequests = await OfferModel.find({
      sellerAddress: { $regex: new RegExp(`^${sellerAddress}$`, "i") },
    });

    const requestIds = acceptedRequests.map((request) => request.requestId);
    const requests = await RequestModel.find({
      requestId: { $in: requestIds },
    });

    return res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/transactions/:buyerId", async (req, res) => {
  try {
    const transactions = await RequestPaymentTransactedModel.find({
      buyerId: req.params.buyerId,
    });

    return res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.post("/api/payment/:requestId", async (req, res) => {
  try {
    connectWithRetry();
    const { requestId, transactionHash } = req.body;
    await paymentModel.updateOne(
      { requestId: requestId },
      { transactionHash, requestId },
      { upsert: true }
    );
    return res.json({ success: true });
  } catch (error) {
    console.log("Error", error);
    return res.json({ error: error, success: false });
  }
});

app.get("/api/ql", async (req, res) => {
  try {
    await getMarketPlaceEvents();
  } catch (_) {}
});
app.post("/api/:requestId", async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const preflightCommitment = "processed";
    const connection = new Connection(
      process.env.SOLANA_RPC_URL,
      preflightCommitment
    );
    const abiDecoder = new BorshCoder(solanaMarketAbi);
    const filter = abiDecoder.accounts.memcmp("RequestPaymentTransaction");
    const accounts = await connection.getParsedProgramAccounts(programID, {
      filters: [
        {
          dataSize: filter.dataSize,
          memcmp: {
            offset: 8 + 32,
            bytes: requestId,
          },
        },
      ],
    });

    let decodedAccount;

    for (const account of accounts) {
      try {
        decodedAccount = abiDecoder.accounts.decode(
          "RequestPaymentTransaction",
          account.account.data
        );
        break;
      } catch (e) {}
    }
    const paymentMade = await paymentModel.findOne({
      requestId: Number(decodedAccount.requestId),
    });

    if (paymentMade) {
      return paymentMade;
    }

    const tokenInfo = Object.keys(decodedAccount.token)[0];

    let tokenMint = "";

    switch (tokenInfo) {
      case "pyusdt":
        tokenMint = process.env.PY_USD_MINT;
        break;
      case "solana":
        tokenMint = process.env.SOL_MINT;
        break;
    }
    const payload = {
      to: decodedAccount.sellerAuthority.toBase58(),
      token: tokenMint,
      amount: Number(decodedAccount.amount).toString(),
    };

    const data = await fetch(
      `https://api.portalhq.io/api/v3/clients/me/chains/${process.env.SOLANA_CHAIN_ID}/assets/send/build-transaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PORTAL_CLIENT_API_KEY}`,
        },
        body: JSON.stringify({
          to: payload.to,
          token: payload.token,
          amount: (+payload.amount / 10 ** CoinDecimals[tokenInfo]).toString(),
        }),
      }
    );

    return res.json(await data.json());
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
