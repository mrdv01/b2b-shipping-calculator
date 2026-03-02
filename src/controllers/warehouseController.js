const { Seller, Product, Warehouse } = require('../models');
const { findNearestWarehouse } = require('../services/warehouseService');
const AppError = require('../utils/AppError');

/**
 * GET /api/v1/warehouse/nearest
 * Returns the nearest warehouse for a seller to drop off a product.
 */
async function getNearestWarehouse(req, res, next) {
    try {
        const { sellerId, productId } = req.query;

        // Find the seller
        const seller = await Seller.findByPk(sellerId);
        if (!seller) {
            throw new AppError(`Seller with ID ${sellerId} not found`, 404);
        }

        // Find the product (verify it belongs to the seller)
        const product = await Product.findOne({
            where: { id: productId, sellerId: seller.id },
        });
        if (!product) {
            throw new AppError(
                `Product with ID ${productId} not found for seller ${sellerId}`,
                404
            );
        }

        // Get all warehouses
        const warehouses = await Warehouse.findAll();
        if (warehouses.length === 0) {
            throw new AppError('No warehouses available', 404);
        }

        // Find nearest warehouse to the seller
        const { warehouse, distance } = findNearestWarehouse(
            seller.latitude,
            seller.longitude,
            warehouses
        );

        res.json({
            success: true,
            data: {
                warehouseId: warehouse.id,
                warehouseName: warehouse.name,
                warehouseLocation: {
                    lat: warehouse.latitude,
                    long: warehouse.longitude,
                },
                distanceFromSeller: parseFloat(distance.toFixed(2)),
            },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { getNearestWarehouse };
