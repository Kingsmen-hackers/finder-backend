# Marketplace Indexer

This project is a marketplace indexer built on top of Ethereum using Web3.js and Mongoose, designed to capture events from a smart contract and store them in a MongoDB database for easy querying. The project processes events related to requests, offers, users, and transactions.

## Prerequisites

1. **Node.js** - Make sure you have Node.js installed. The latest LTS version is recommended.
2. **MongoDB** - A MongoDB instance is required to store indexed data.
3. **Environment Variables** - Create a `.env` file to store environment-specific variables.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Kingsmen-hackers/finder-backend
   cd finder-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Configuration**:

   - Create a `.env` file with the following variables:

     ```plaintext
        CONTRACT_ADDRESS="0x00000000000000000000000000000000004d337a"
        MONGO_URI="mongodb+srv://kingsmenhackers:XXXXX@match-evm.el6be.mongodb.net/"
        NODE_ENV="production"
        CONTRACT_RPC="https://testnet.hashio.io/api"
        START_BLOCK_NUMBER=11149601
        CONTRACT_ID = gSh52u5Nt39rb8CSHQhUhF1cSdFsL9JebSoPZmazFrZ
        SOLANA_RPC_URL = https://little-intensive-patina.solana-devnet.quiknode.pro/bc83XXXXXXXb578
        PORTAL_CLIENT_API_KEY=0XXX5284-ff83-4XXX0-89a2-6XXXX5bf
        SOLANA_CHAIN_ID = solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1
        SOL_MINT = SOL
        PY_USD_MINT = CXk2AMBfi3TwaEL2468s6zP8xq9NxTXjp9gjMgzeUynM
     ```

4. **Run the Indexer**:
   - Use PM2 to start and manage the process:
     ```bash
     npm install -g pm2
     pm2 start indexer.js --name marketplace-indexer
     pm2 startup
     pm2 save
     ```

## File Structure

- **base.js**: Configures Web3 and MongoDB connection.
- **models/**: Contains Mongoose schemas for different event types.
- **indexer.js**: Main file that listens to events and updates the database.
- **utils/**: (Optional) Utility functions for handling events, logging, etc.

## Functionality

The indexer listens to the following events:

1. **Request Events**:

   - `RequestCreated`
   - `RequestAccepted`
   - `RequestDeleted`
   - `RequestPaymentTransacted`
   - `RequestMarkedAsCompleted`

2. **Offer Events**:

   - `OfferCreated`
   - `OfferAccepted`

3. **User Events**:
   - `UserCreated`
   - `UserUpdated`

Each event is captured from the blockchain and saved to MongoDB using `Mongoose`. If the event already exists (checked by transaction hash or unique ID), it will be updated instead of duplicated.

### Interval Fetching

Every 5 seconds, the indexer checks for new events and updates the `LastBlockModel` to keep track of the last processed block.

## Running in Development Mode

To run the app in development mode, set `NODE_ENV=development` in your `.env` file. This enables MongoDB debugging and helpful logging for development purposes.

## Usage with PM2

PM2 is used to ensure the indexer runs persistently and can restart on crashes.

1. Start the process:

   ```bash
   pm2 start indexer.js --name marketplace-indexer
   ```

2. View logs:

   ```bash
   pm2 logs marketplace-indexer
   ```

3. Stop the process:

   ```bash
   pm2 stop marketplace-indexer
   ```

4. Restart the process:

   ```bash
   pm2 restart marketplace-indexer
   ```

5. Save the PM2 process list for auto-restart on server reboots:
   ```bash
   pm2 save
   ```

---

## License

This project is licensed under the MIT License.
