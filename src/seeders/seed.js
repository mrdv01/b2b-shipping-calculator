const { Customer, Seller, Product, Warehouse } = require('../models');

/**
 * Seeds the database with sample data from the specification.
 * Only inserts if tables are empty (idempotent).
 */
async function seedDatabase() {
    // Seed Customers
    const customerCount = await Customer.count();
    if (customerCount === 0) {
        await Customer.bulkCreate([
            {
                customerId: 'Cust-123',
                name: 'Shree Kirana Store',
                phone: '9847000000',
                latitude: 11.232,
                longitude: 23.445495,
            },
            {
                customerId: 'Cust-124',
                name: 'Andheri Mini Mart',
                phone: '9101000000',
                latitude: 17.232,
                longitude: 33.445495,
            },
        ]);
        console.log('Seeded customers');
    }

    // Seed Sellers
    const sellerCount = await Seller.count();
    if (sellerCount === 0) {
        await Seller.bulkCreate([
            { name: 'Nestle Seller', latitude: 12.9716, longitude: 77.5946 },
            { name: 'Rice Seller', latitude: 19.076, longitude: 72.8777 },
            { name: 'Sugar Seller', latitude: 13.0827, longitude: 80.2707 },
        ]);
        console.log('Seeded sellers');
    }

    // Seed Products
    const productCount = await Product.count();
    if (productCount === 0) {
        await Product.bulkCreate([
            {
                name: 'Maggie 500g Packet',
                sellingPrice: 10,
                weight: 0.5,
                dimensionL: 10,
                dimensionW: 10,
                dimensionH: 10,
                sellerId: 1,
            },
            {
                name: 'Rice Bag 10Kg',
                sellingPrice: 500,
                weight: 10,
                dimensionL: 1000,
                dimensionW: 800,
                dimensionH: 500,
                sellerId: 2,
            },
            {
                name: 'Sugar Bag 25kg',
                sellingPrice: 700,
                weight: 25,
                dimensionL: 1000,
                dimensionW: 900,
                dimensionH: 600,
                sellerId: 3,
            },
        ]);
        console.log('Seeded products');
    }

    // Seed Warehouses
    const warehouseCount = await Warehouse.count();
    if (warehouseCount === 0) {
        await Warehouse.bulkCreate([
            { name: 'BLR_Warehouse', latitude: 12.99999, longitude: 37.923273 },
            { name: 'MUMB_Warehouse', latitude: 11.99999, longitude: 27.923273 },
        ]);
        console.log('Seeded warehouses');
    }
}

module.exports = seedDatabase;
