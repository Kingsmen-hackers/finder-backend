const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { ethers } = require("ethers");
const cors = require("cors");
require("dotenv").config();
const RequestModel = require("./models/Request.model");
const app = express();
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
      buyerAddress: req.params.buyerAddress,
    });
    return res.json(buyers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
