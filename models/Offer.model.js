const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Offer = new Schema(
  {
    address: String,
    transactionHash: String,
    eventName: String,
    signature: String,
    offerId: Number,
    sellerAddress: String,
    storeName: String,
    price: Number,
    requestId: Number,
    images: [String],
    sellerId: Number,
    isAccepted: Boolean,
    sellerIds: [Number],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  {
    collection: "offer", // Specify the desired table name here
  }
);

module.exports = mongoose.model("offer", Offer);
