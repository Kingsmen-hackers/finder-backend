import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

// Load environment variables from `.env` file
dotenv.config();

export const programID = new PublicKey(process.env.CONTRACT_ID);
