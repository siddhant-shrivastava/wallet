# Wallet Backend

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
* **npm**  Node Package Manager (npm) comes bundled with Node.js. You can check if you have it by running `npm -v`. Alternatively, you can use yarn, which can be installed from [https://yarnpkg.com/](https://yarnpkg.com/).
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

### POST /wallets/setup: Initializes a new wallet.

**Request body:**  
```json
    { 
        "name": "string", 
        "balance": "number" 
    }
```

**Response body:**
```json
    { 
    "id": "string", 
    "name": "string", 
    "balance": "number", 
    "date": "string", 
    "transactionId": "string" 
    }
```

## Database Setup
The backend connects to a MongoDB database using the URI specified in the .env file (MONGODB_URI). Make sure your MongoDB server is running and accessible at that URI. The application uses Mongoose to interact with the database, defining schemas and models for wallets and transactions.

## Contributing
If you'd like to contribute to this project, please follow these guidelines:

## Fork the repository.
Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name 5.1 Open a pull request.