const Web3 = require("web3");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const matchABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./match.abi.json"), "utf8")
);

// get websocket from aurora api
const web3 = new Web3(process.env.CONTRACT_RPC);
const matchContract = new web3.eth.Contract(
  matchABI,
  process.env.CONTRACT_ADDRESS
);

function truncateToBytes(str, byteLimit) {
  let bytes = 0;
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    // Get the byte size of the character in UTF-8
    const charCode = char.charCodeAt(0);

    // Determine the number of bytes for the character
    if (charCode <= 0x7f) {
      bytes += 1; // 1 byte (ASCII characters)
    } else if (charCode <= 0x7ff) {
      bytes += 2; // 2 bytes
    } else if (charCode <= 0xffff) {
      bytes += 3; // 3 bytes
    } else {
      bytes += 4; // 4 bytes
    }

    // Stop appending characters if byte limit is exceeded
    if (bytes > byteLimit) {
      break;
    }

    result += char;
  }

  return result;
}

const GET_MONGO_URI = `${
  process.env.MONGO_URI
}${process.env.CONTRACT_ADDRESS.slice(-38)}`;

module.exports = {
  matchContract,
  web3,
  GET_MONGO_URI,
};
