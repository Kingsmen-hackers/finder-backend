const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");
const cors = require("cors");
require("dotenv").config();
const RequestModel = require("./models/Request.model");
const { isWithinThreshold, threshold } = require("./location");
const app = express();
const CONTRACT_ID_EVM = "0x00000000000000000000000000000000004783f1";
const port = process.env.PORT || 5100;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", process.env.NODE_ENV != "production");

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
app.get("/requests/requestId/:id", async (req, res) => {
  try {
    const request = await RequestModel.find({
      requestId: {
        $regex: new RegExp(`^${req.params.id}$`, "i"),
      },
    });

    return res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.get("/requests", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
