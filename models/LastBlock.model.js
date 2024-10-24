import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LastBlock = new Schema(
  {
    blockNumber: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  {
    collection: "last_block", // Specify the desired table name here
  }
);

export const LastBlockModel = mongoose.model("last_block", LastBlock);
