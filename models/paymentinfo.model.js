import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PaymentInfo = new Schema(
  {
    transactionHash: String,
    requestId: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "payment_info", // Specify the desired table name here
  }
);

export const paymentModel = mongoose.model("payment_info", PaymentInfo);
