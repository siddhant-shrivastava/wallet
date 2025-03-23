**# Wallet Backend

This is the backend API for the Wallet application. It provides the necessary endpoints for managing user wallets and transactions.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **Express:** Minimalist web application framework for Node.js.
* **MongoDB:** NoSQL database for storing application data.
* **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
* **Other Libraries:** express-validator, body-parser, cors, dotenv.

## Prerequisites

Before you can run the backend, you need to have the following installed on your system:

* **Node.js:** Make sure you have Node.js (latest LTS version recommended) installed. You can download it from [https://nodejs.org/](https://nodejs.org/).
* **npm**  Node Package Manager (npm) comes bundled with Node.js. You can check if you have it by running `npm -v`..
* **MongoDB:** Ensure you have MongoDB installed and running. You can follow the installation instructions on the official MongoDB website: [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/).

## Installation

Follow these steps to set up the backend:

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root of your backend project. You will need to define the following environment variables (adjust as needed):

    ```env
    PORT=3001             # The port the server will run on (you can choose a different one)
    MONGODB_URI=mongodb://localhost:27017/wallet_app  # Your MongoDB connection URI
    # Add any other environment variables your application needs here
    ```

    * **`PORT`:** Specifies the port number for the backend server.
    * **`MONGODB_URI`:** The connection string for your MongoDB database. Update `localhost:27017/wallet_app` if your MongoDB instance is running elsewhere or you want to use a different database name.

## Running the Backend

To start the development server, run the following command in your terminal within the backend project directory:

Using npm:
    ```bash
    npm run dev 
    ```

This command typically uses a tool like nodemon (if you have it configured in your package.json) to automatically restart the server when you make changes to the code. If you don't have nodemon, you might have a simple start script:

Using npm:
    ```bash
    npm start
    ```

The server should now be running on the port you specified in your .env file (default is http://localhost:3001).

## API Endpoints
Here is one of the main API endpoints provided by this backend:

## [wallet-backend-url](https://wallet-backend-liart.vercel.app/setup)

### POST /setup: Initializes a new wallet.

**Request body:**  

```json
    {
      "name": "My Wallet",
      "balance": 100
    }
```
**Response body:**

```json
    {
      "id": "someGeneratedWalletId",
      "name": "My Wallet",
      "balance": 100,
      "date": "2025-03-23T19:00:00.000Z",
      "transactionId": "someInitialTransactionId"
    }
```
### GET /wallet/:id (this id you will get from response of POST /setup:) get wallet details.

**Response body:**
```json
    {
      "id": "someGeneratedWalletId",
      "name": "My Wallet",
      "balance": 100,
      "date": "2025-03-23T19:00:00.000Z"
    }
```

### POST /transact/:walletId do transactions like credit/debit .

**Path parameter:**
- `walletId` (string) – The ID of the wallet.

**Request body:**  
```json
    {
      "amount": 50,
      "description": "Payment for service"
    }
```

**Response body:**
```json
    {
      "_id": "someGeneratedTransactionId",
      "walletId": "someGeneratedWalletId",
      "amount": 50,
      "balance": 150,
      "description": "Payment for service",
      "date": "2025-03-23T19:10:00.000Z",
      "type": "CREDIT"
    }
```

### GET /api/transactions get transactions list.

**Query parameters:**
- `walletId` (string) – The ID of the wallet (e.g., `someGeneratedWalletId`)
- `page` (number) – The page number for pagination (default: 0)
- `limit` (number) – The number of transactions per page (default: 10)

**Response body:**
```json
    {
      "transactions": [
        {
          "_id": "...",
          "walletId": "...",
          "amount": "...",
          "balance": "...",
          "description": "...",
          "date": "...",
          "type": "CREDIT" | "DEBIT"
        },
        // ... more transactions
      ],
      "totalCount": 15 // Total number of transactions for this wallet
    }
```

### Database and Query Design
This backend uses MongoDB as its database, which is a NoSQL document database. We have designed the database with the following main collections:

**Wallets:** Stores information about each user's wallet, including their name, current balance, and creation date. Each wallet has a unique ID.
**Transactions:** Stores records of all transactions made for each wallet. Each transaction includes details like the associated wallet ID, the amount of the transaction, the resulting balance, a description (optional), the date of the transaction, and the type of transaction (CREDIT or DEBIT). Each transaction also has a unique ID.

### Query Design:

We utilize Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js. This allows us to define schemas for our data and interact with the database using JavaScript objects and methods.

**Fetching Wallet Details:** We typically query the Wallets collection using the unique walletId to retrieve specific wallet information. Mongoose's findById() method is commonly used for this purpose.

**Adding Transactions:** When a new transaction occurs, we create a new document in the Transactions collection, linking it to the corresponding walletId. We also update the balance field of the associated Wallet document. We have 

**Fetching Transactions:** To retrieve transactions for a specific wallet, we query the Transactions collection using the walletId. For pagination, as shown in the /transactions endpoint, we use Mongoose's skip() and limit() methods to retrieve a specific subset of transactions based on the page and limit query parameters. We also use countDocuments() to get the total number of transactions for a wallet to implement proper pagination.

This design allows for efficient storage and retrieval of wallet and transaction data, enabling the core functionality of the Wallet application.

