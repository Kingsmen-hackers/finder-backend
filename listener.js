const Web3 = require("web3");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const RequestModel = require("./models/Request.model");
const LastBlockModel = require("./models/LastBlock.model");

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
const HouseNFTEvent = new web3.eth.Contract(
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
  const events = await HouseNFTEvent.getPastEvents("RequestCreated", {
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
      },
      {
        upsert: true,
      }
    );
    console.log(result);
  });
};
const processOfferCreated = async ({ latestBlockNumber, lastScannedBlock }) => {
  const events = await HouseNFTEvent.getPastEvents("OfferCreated", {
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
    // get timestamp from block
    const block = await web3.eth.getBlock(event.blockNumber);
    event.timestamp = block.timestamp;

    await OfferModel.updateOne(
      { transactionHash },
      {
        address,
        transactionHash,
        eventName,
        signature,
        offerId,
        sellerAddress,
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
