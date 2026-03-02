const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const {
    getShippingCharge,
    calculateTotalShipping,
} = require('../controllers/shippingController');

// GET /api/v1/shipping-charge?warehouseId=1&customerId=1&deliverySpeed=standard
router.get(
    '/',
    validate(['warehouseId', 'customerId', 'deliverySpeed'], 'query'),
    getShippingCharge
);

// POST /api/v1/shipping-charge/calculate
router.post(
    '/calculate',
    validate(['sellerId', 'customerId', 'deliverySpeed'], 'body'),
    calculateTotalShipping
);

module.exports = router;
