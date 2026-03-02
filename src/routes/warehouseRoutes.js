const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { getNearestWarehouse } = require('../controllers/warehouseController');

// GET /api/v1/warehouse/nearest?sellerId=1&productId=1
router.get(
    '/nearest',
    validate(['sellerId', 'productId'], 'query'),
    getNearestWarehouse
);

module.exports = router;
