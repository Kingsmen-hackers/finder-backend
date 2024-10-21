const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestPaymentTransacted = new Schema(
  {
    timestamp: Number,
    amount: Number,
    token: Number,
    requestId: Number,
    sellerId: Number,
    buyerId: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  {
    collection: "requestTransaction", // Specify the desired table name here
  }
);

module.exports = mongoose.model("requestTransaction", RequestPaymentTransacted);
