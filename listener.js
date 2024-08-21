const Web3 = require("web3");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const RequestModel = require("./models/Request.model");
const LastBlockModel = require("./models/LastBlock.model");
const OfferModel = require("./models/Offer.model");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Database");
});
mongoose.set("debug", process.env.NODE_ENV != "production");

const finderABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./finder.abi.json"), "utf8")
);

// get websocket from aurora api
const web3 = new Web3(process.env.CONTRACT_RPC);
const MatchEvents = new web3.eth.Contract(
  finderABI,
  process.env.CONTRACT_ADDRESS
);
const getMarketPlaceEvents = async () => {
  try {
    let latestBlockNumber = await web3.eth.getBlockNumber();

    let _lastScannedBlock = await LastBlockModel.findOne(
      { blockNumber: { $ne: 0 } },
      {},
      {
        upsert: true,
      }
    );
    if (!_lastScannedBlock) {
      _lastScannedBlock = await LastBlockModel.create({
        blockNumber: +process.env.START_BLOCK_NUMBER,
      });
    }
    let lastScannedBlock = _lastScannedBlock.blockNumber;
    let lastScannedBlockOffset = lastScannedBlock + 2000;

    if (lastScannedBlockOffset > latestBlockNumber) {
      lastScannedBlockOffset = latestBlockNumber;
    }
    const option = {
      latestBlockNumber: lastScannedBlockOffset,
      lastScannedBlock,
    };

    await processRequestCreated(option);
    await processOfferCreated(option);
    await processRequestAccepted(option);

    lastScannedBlock = lastScannedBlockOffset;

    await LastBlockModel.updateOne(
      {
        blockNumber: { $ne: 0 },
      },
      {
        blockNumber: lastScannedBlockOffset,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const processRequestCreated = async ({
  latestBlockNumber,
  lastScannedBlock,
}) => {
  const events = await MatchEvents.getPastEvents("RequestCreated", {
    fromBlock: lastScannedBlock + 1,
    toBlock: latestBlockNumber,
  });


  // Process the events
  events.forEach(async (event) => {
    const address = event.address;
    const transactionHash = event.transactionHash;
    const eventName = event.event;
    const signature = event.signature;
    const requestId = event.returnValues["requestId"];
    const buyerAddress = event.returnValues["buyerAddress"];
    const images = event.returnValues["images"];
    const lifecycle = event.returnValues["lifecycle"];
    const requestName = event.returnValues["requestName"];
    const description = event.returnValues["description"];
    const latitude = event.returnValues["latitude"];
    const longitude = event.returnValues["longitude"];
    const buyerId = event.returnValues["buyerId"];
    const sellerIds = event.returnValues["sellerIds"];
    const sellersPriceQuote = event.returnValues["sellersPriceQuote"];
    const lockedSellerId = event.returnValues["lockedSellerId"];
    const createdAt = event.returnValues["createdAt"];
    const updatedAt = event.returnValues["updatedAt"];

    // get timestamp from block
    const block = await web3.eth.getBlock(event.blockNumber);
    event.timestamp = block.timestamp;

    const result = await RequestModel.updateOne(
      { transactionHash },
      {
        address,
        transactionHash,
        eventName,
        signature,
        requestId,
        buyerAddress,
        images,
        lifecycle,
        requestName,
        description,
        latitude,
        longitude,
        buyerId,
        sellerIds,
        sellersPriceQuote,
        lockedSellerId,
        createdAt,
        updatedAt,
      },
      {
        upsert: true,
      }
    );
    console.log(result);
  });
};
const processOfferCreated = async ({ latestBlockNumber, lastScannedBlock }) => {
  const events = await MatchEvents.getPastEvents("OfferCreated", {
    fromBlock: lastScannedBlock + 1,
    toBlock: latestBlockNumber,
  });

  

  // Process the events
  events.forEach(async (event) => {
    const address = event.address;
    const transactionHash = event.transactionHash;
    const eventName = event.event;
    const signature = event.signature;
    const offerId = event.returnValues["offerId"];
    const sellerAddress = event.returnValues["sellerAddress"];
    const storeName = event.returnValues["storeName"];
    const price = event.returnValues["price"];
    const requestId = event.returnValues["requestId"];
    const images = event.returnValues["images"];
    const sellerId = event.returnValues["sellerId"];

    // get timestamp from block
    const block = await web3.eth.getBlock(event.blockNumber);
    event.timestamp = block.timestamp;

    await OfferModel.updateOne(
      { transactionHash},
      {
        address,
        transactionHash,
        eventName,
        signature,
        offerId,
        sellerAddress,
        storeName,
        price,
        requestId,
        images,
        sellerId,
      },
      {
        upsert: true,
      }
    );
    await RequestModel.updateOne(
      { requestId },
      {
        lifecycle: 2,
      },
      {
        upsert: true,
      }
    );
  });
};
const processRequestAccepted = async ({ latestBlockNumber, lastScannedBlock }) => {
  const events = await MatchEvents.getPastEvents("RequestAccepted", {
    fromBlock: lastScannedBlock + 1,
    toBlock: latestBlockNumber,
  });
  events.forEach(async (event) => {
    const requestId = event.returnValues["requestId"];
    const sellerId = event.returnValues["sellerId"];
    await RequestModel.updateOne(
      { requestId },
      {
        lifecycle: 1,
        lockedSellerId: sellerId,
      },
      {
        upsert: true,
      }
    );
  });
};

module.exports = getMarketPlaceEvents;

setInterval(async () => {
  await getMarketPlaceEvents();
  console.log("interval called");
}, 5000);
