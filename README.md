# Jumbotail Shipping Estimator
## Overview

The **Jumbotail Shipping Estimator** is a comprehensive B2B E-Commerce Shipping Charge Calculator application. It demonstrates a robust logic for determining shipping costs based on distance, product dimensions, weight, and selected delivery speeds.

This project features a solid **Node.js/Express** backend for calculating shipping charges and identifying the nearest warehouses using geospatial (Haversine) formulas, paired with a modern **React/Vite** frontend dashboard to interactively test the API capabilities.

## Key Features

*   **Shipping Charge Calculation**: Calculates shipping costs dynamically utilizing product dimensions, volumetric weight vs. actual weight, and geographical distance.
*   **Nearest Warehouse Identification**: Identifies the closest warehouse to a given seller using the Haversine formula to compute distances accurately.
*   **Full End-to-End Estimation**: A complete workflow combining warehouse identification and shipping calculation based on the selected delivery speed (Standard / Express).
*   **Modern Interactive Dashboard**: A sleek, user-friendly interface built with React, Vite, and Tailwind CSS (v4) to visualize calculations and test scenarios.
*   **Robust Backend Integrity**: Powered by Node.js, Express, and Sequelize ORM integrating smoothly with an SQLite database.
*   **Unit Tested**: Ships with comprehensive Jest unit tests covering core business logic and utility functions.

---

## Architecture & Tech Stack

### Backend
*   **Runtime:** Node.js (v18+)
*   **Framework:** Express.js
*   **Database:** SQLite (Relational DB for high portability)
*   **ORM:** Sequelize
*   **Validation:** Express-Validator / Custom Middleware
*   **Testing:** Jest

### Frontend (Dashboard)
*   **Library:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v4)
*   **Language:** TypeScript (for type safety and autocompletion)

---

## Project Structure

```
jumbotail/
│── /src               # Node.js Express backend application and API routes
│   ├── /controllers   # Request handling logic
│   ├── /models        # Sequelize DB models
│   ├── /routes        # API route definitions
│   ├── /services      # Core business logic
│   └── /utils         # Helper functions (e.g., Haversine distance)
│
│── /client            # React/Vite frontend dashboard
│   ├── /src/components# UI Components
│   └── /src/App.tsx   # Main Application Entry
│
└── /tests             # Jest unit tests for backend logic
```

---

## Getting Started

### Prerequisites

*   **Node.js** (v18 or higher recommended)
*   **npm** (Node Package Manager)

### 1. Backend Setup

Open your terminal and follow these steps to start the Express server:

```bash
# Clone the repository (if applicable)
# git clone <repo_url>
# cd jumbotail

# Install backend dependencies
npm install

# Copy the example environment file and configure variables if needed
cp .env.example .env

# Start the server in development mode (using nodemon)
npm run dev

# OR start in production mode
npm start
```

The backend server will run on `http://localhost:3000` by default.

### 2. Frontend Setup

Open a **new terminal window** and follow these steps to start the React dashboard:

```bash
# Navigate to the client directory
cd client

# Install frontend dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

---

## API Documentation

The backend exposes several RESTful endpoints categorized under `/api/v1`:

### 1. Health Check
*   **Endpoint:** `GET /api/health`
*   **Description:** Validates if the API is up and running.

### 2. Nearest Warehouse Lookup
*   **Endpoint:** `GET /api/v1/warehouse/nearest`
*   **Query Parameters:**
    *   `sellerId` (Integer) - ID of the seller
    *   `productId` (Integer) - ID of the product
*   **Description:** Returns the nearest warehouse that has the requested product in stock, based on the seller's location.

### 3. Get Specific Shipping Charge
*   **Endpoint:** `GET /api/v1/shipping-charge`
*   **Query Parameters:**
    *   `warehouseId` (Integer) - ID of the dispatch warehouse
    *   `customerId` (Integer) - ID of the destination customer
    *   `deliverySpeed` (String) - Enum: `standard` or `express`
*   **Description:** Calculates the raw shipping charge based on distance and delivery speed.

### 4. Calculate Total Shipping (End-to-End)
*   **Endpoint:** `POST /api/v1/shipping-charge/calculate`
*   **Body (JSON):**
    ```json
    {
      "sellerId": 1,
      "customerId": 2,
      "deliverySpeed": "standard"
    }
    ```
*   **Description:** Combines the nearest warehouse lookup and shipping calculation to return the final estimated shipping cost.

---

## Running Tests

To run the backend unit tests, simply execute the following from the root directory:

```bash
npm test
```
*Tests are written using Jest and cover the Haversine utility, core business logic, and API endpoints.*

---

## License

This project is licensed under the **ISC License**.
