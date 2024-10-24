import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RequestPaymentTransacted = new Schema(
  {
    timestamp: Number,
    amount: Number,
    token: Number,
    requestId: Number,
    sellerId: Number,
    buyerId: Number,
    createdAt: Number,
    updatedAt: Number,
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

export const RequestPaymentTransactedModel = mongoose.model(
  "requestTransaction",
  RequestPaymentTransacted
);
