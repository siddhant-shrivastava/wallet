# Wallet Frontend

This is the frontend application for the Wallet system, built using React + vite. It provides a user interface for managing wallets and viewing transaction history.

## Technologies Used

* **React:** JavaScript library for building user interfaces.
* **Material-UI (MUI):** A popular React UI framework providing pre-built components.
* **React Router DOM:** For handling navigation and routing within the application.
* **Axios:** For making HTTP requests to the backend API.
* **Other Libraries:** `react-csv` for exporting data to CSV.

## Prerequisites

Before you can run the frontend, you need to have the following installed on your system:

* **Node.js:** Make sure you have Node.js (latest LTS version recommended) installed. You can download it from [https://nodejs.org/](https://nodejs.org/).
* **npm** Node Package Manager (npm) comes bundled with Node.js. You can check if you have it by running `npm -v`. Alternatively, you can use yarn, which can be installed from [https://yarnpkg.com/](https://yarnpkg.com/).

## Installation

Follow these steps to set up the frontend:

1.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```

## Running the Frontend (Development)

To start the development server, run the following command in your terminal within the `frontend` folder:
   Using npm:
    ```bash
    npm run dev
    ```
# or
yarn start
This will start the React development server, and the application will usually be accessible in your browser at http://localhost:3000. Any changes you make to the code will automatically reload in the browser.

Building the Frontend (Production)
To create a production build of the frontend, run the following command:

Bash

npm run build
# or
yarn build
This will generate an optimized build of your application in the build folder. These files can then be deployed to a static hosting provider like Vercel, Netlify, or others.

Environment Variables
The frontend might require some environment variables for configuration, such as the base URL of the backend API. You can create a .env file in the root of your frontend folder to define these variables. For example:

# Code snippet

VITE_API_BASE_URL=http://localhost:3001/api  # Replace with your backend API URL

This frontend application is typically deployed using a platform like Vercel. The vercel.json file in the root of the frontend folder configures how Vercel should build and serve the application, especially for handling client-side routing.

# Contributing
If you'd like to contribute to this project, please follow these guidelines:

Fork the repository.
Create a new branch for your feature or bug fix: git checkout -b feature/your-feature-name
Make your changes and commit them: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Open a pull request.