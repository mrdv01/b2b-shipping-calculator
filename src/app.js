const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const warehouseRoutes = require('./routes/warehouseRoutes');
const shippingRoutes = require('./routes/shippingRoutes');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health Check ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use('/api/v1/warehouse', warehouseRoutes);
app.use('/api/v1/shipping-charge', shippingRoutes);

// --- 404 Handler ---
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: { message: `Route ${req.method} ${req.originalUrl} not found`, statusCode: 404 },
    });
});

// --- Global Error Handler ---
app.use(errorHandler);

module.exports = app;
