# Jumbotail Shipping Estimator Dashboard

This is the frontend dashboard for the Jumbotail B2B E-Commerce Shipping Charge Estimator API.
It is built using modern web development tools for optimal performance and developer experience.

## Tech Stack

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast, modern build tool that significantly improves the frontend development experience.
-   **TypeScript**: Adds static typing to JavaScript to improve code quality.
-   **Tailwind CSS (v4)**: A utility-first CSS framework for rapid UI development.

## Getting Started

First, ensure you have the Node.js backend running (see the root `README.md` for instructions).

To run this React application locally, follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start the development server**:
    ```bash
    npm run dev
    ```

3.  The application will be accessible at `http://localhost:5173`.

## Features

-   **Nearest Warehouse Component**: Uses the backend API to determine the closest warehouse to a given seller location.
-   **Shipping Charge Component**: Queries the backend to calculate precise shipping charges based on item weight, dimensions, and distance.
-   **Full Calculation Workflow**: Combines nearest warehouse lookup and shipping charge calculation in one seamless view.
