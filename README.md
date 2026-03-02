# Jumbotail Shipping Estimator

A comprehensive B2B E-Commerce Shipping Charge Estimator application. This project features a Node.js/Express backend for calculating shipping charges and a modern React/Vite frontend for testing the API capabilities.

## Features

*   **Shipping Charge Calculation**: Calculate shipping charges based on product dimensions, weight, and distance.
*   **Nearest Warehouse Identification**: Find the closest warehouse to a given seller using geospatial (Haversine) calculations.
*   **Full End-to-End Estimation**: Combine warehouse identification and shipping calculation into a seamless process.
*   **Modern Frontend Dashboard**: A sleek, user-friendly interface built with React, Vite, and Tailwind CSS.
*   **Robust Backend**: Powered by Node.js, Express, and Sequelize for SQLite database interaction.
*   **Unit Tested**: Includes comprehensive Jest unit tests for the core logic.

## Project Structure

*   **/src**: Contains the Node.js Express backend application and API routes.
*   **/client**: Contains the React/Vite frontend dashboard.
*   **/tests**: Contains Jest unit tests for the backend logic.

## Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (Node Package Manager)

## Getting Started

### 1. Backend Setup

Follow these steps to start the Express server:

```bash
# Install backend dependencies
npm install

# Copy the example environment file
cp .env.example .env

# Start the server in development mode
npm run dev
# OR start in production mode
npm start
```

The backend server will run on `http://localhost:3000` by default.

### 2. Frontend Setup

Open a new terminal window and follow these steps to start the React dashboard:

```bash
# Navigate to the client directory
cd client

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend application will be available at `http://localhost:5173` (or depending on Vite's allocation).

## Running Tests

To run the backend unit tests, simply execute:

```bash
npm test
```

## License

This project is licensed under the ISC License.
