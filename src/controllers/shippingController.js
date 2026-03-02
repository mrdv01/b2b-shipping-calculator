const { Customer, Seller, Product, Warehouse } = require('../models');
const { findNearestWarehouse } = require('../services/warehouseService');
const { calculateShippingCharge } = require('../services/shippingService');
const { calculateDistance } = require('../utils/haversine');
const AppError = require('../utils/AppError');

/**
 * GET /api/v1/shipping-charge
 * Returns shipping charge from a warehouse to a customer.
 */
async function getShippingCharge(req, res, next) {
    try {
        const { warehouseId, customerId, deliverySpeed } = req.query;

        // Validate delivery speed
        const speed = (deliverySpeed || 'standard').toLowerCase();
        if (!['standard', 'express'].includes(speed)) {
            throw new AppError(
                'Invalid deliverySpeed. Must be "standard" or "express"',
                400
            );
        }

        // Find warehouse
        const warehouse = await Warehouse.findByPk(warehouseId);
        if (!warehouse) {
            throw new AppError(`Warehouse with ID ${warehouseId} not found`, 404);
        }

        // Find customer
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw new AppError(`Customer with ID ${customerId} not found`, 404);
        }

        // We need a product weight for the calculation.
        // For this endpoint, we use a default weight of 1 kg if no product is specified.
        // The productId can optionally be passed as a query param.
        let weightKg = 1;
        if (req.query.productId) {
            const product = await Product.findByPk(req.query.productId);
            if (product) {
                weightKg = product.weight;
            }
        }

        // Calculate distance
        const distanceKm = calculateDistance(
            warehouse.latitude,
            warehouse.longitude,
            customer.latitude,
            customer.longitude
        );

        // Calculate shipping charge
        const result = calculateShippingCharge(distanceKm, weightKg, speed);

        res.json({
            success: true,
            data: {
                shippingCharge: result.shippingCharge,
                transportMode: result.transportMode,
                deliverySpeed: speed,
                breakdown: result.breakdown,
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/v1/shipping-charge/calculate
 * End-to-end: finds nearest warehouse + calculates total shipping charge.
 */
async function calculateTotalShipping(req, res, next) {
    try {
        const { sellerId, customerId, deliverySpeed } = req.body;

        // Validate delivery speed
        const speed = (deliverySpeed || 'standard').toLowerCase();
        if (!['standard', 'express'].includes(speed)) {
            throw new AppError(
                'Invalid deliverySpeed. Must be "standard" or "express"',
                400
            );
        }

        // Find seller with products
        const seller = await Seller.findByPk(sellerId, {
            include: [{ model: Product, as: 'products' }],
        });
        if (!seller) {
            throw new AppError(`Seller with ID ${sellerId} not found`, 404);
        }

        // Find customer
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            throw new AppError(`Customer with ID ${customerId} not found`, 404);
        }

        // Get all warehouses and find nearest to seller
        const warehouses = await Warehouse.findAll();
        if (warehouses.length === 0) {
            throw new AppError('No warehouses available', 404);
        }

        const { warehouse: nearestWarehouse } = findNearestWarehouse(
            seller.latitude,
            seller.longitude,
            warehouses
        );

        // Calculate distance from warehouse to customer
        const distanceKm = calculateDistance(
            nearestWarehouse.latitude,
            nearestWarehouse.longitude,
            customer.latitude,
            customer.longitude
        );

        // Use the first product's weight (or average weight if multiple products)
        let weightKg = 1;
        if (seller.products && seller.products.length > 0) {
            weightKg = seller.products[0].weight;
        }

        // Calculate shipping charge
        const result = calculateShippingCharge(distanceKm, weightKg, speed);

        res.json({
            success: true,
            data: {
                shippingCharge: result.shippingCharge,
                nearestWarehouse: {
                    warehouseId: nearestWarehouse.id,
                    warehouseName: nearestWarehouse.name,
                    warehouseLocation: {
                        lat: nearestWarehouse.latitude,
                        long: nearestWarehouse.longitude,
                    },
                },
                transportMode: result.transportMode,
                deliverySpeed: speed,
                breakdown: result.breakdown,
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getShippingCharge, calculateTotalShipping };
