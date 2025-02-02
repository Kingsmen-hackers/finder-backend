import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserCreated = new Schema(
  {
    userAddress: String,

    username: String,
    userId: Number,
    accountType: Number,
    address: String,
    transactionHash: String,
    eventName: String,
    signature: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  {
    collection: "userDetails", // Specify the desired table name here
  }
);

export const UserCreatedModel = mongoose.model("userDetails", UserCreated);
