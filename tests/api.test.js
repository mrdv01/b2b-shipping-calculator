const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');
const seedDatabase = require('../src/seeders/seed');

// Setup and teardown
beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedDatabase();
});

afterAll(async () => {
    await sequelize.close();
});

describe('GET /api/health', () => {
    test('should return health status', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });
});

describe('GET /api/v1/warehouse/nearest', () => {
    test('should return nearest warehouse for a valid seller/product', async () => {
        const res = await request(app)
            .get('/api/v1/warehouse/nearest')
            .query({ sellerId: 1, productId: 1 });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('warehouseId');
        expect(res.body.data).toHaveProperty('warehouseName');
        expect(res.body.data).toHaveProperty('warehouseLocation');
        expect(res.body.data.warehouseLocation).toHaveProperty('lat');
        expect(res.body.data.warehouseLocation).toHaveProperty('long');
    });

    test('should return 400 when sellerId is missing', async () => {
        const res = await request(app)
            .get('/api/v1/warehouse/nearest')
            .query({ productId: 1 });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('should return 404 for non-existent seller', async () => {
        const res = await request(app)
            .get('/api/v1/warehouse/nearest')
            .query({ sellerId: 999, productId: 1 });

        expect(res.statusCode).toBe(404);
        expect(res.body.success).toBe(false);
    });
});

describe('GET /api/v1/shipping-charge', () => {
    test('should return shipping charge for valid params', async () => {
        const res = await request(app)
            .get('/api/v1/shipping-charge')
            .query({ warehouseId: 1, customerId: 1, deliverySpeed: 'standard' });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('shippingCharge');
        expect(res.body.data).toHaveProperty('transportMode');
        expect(res.body.data).toHaveProperty('breakdown');
        expect(typeof res.body.data.shippingCharge).toBe('number');
    });

    test('should return 400 for invalid delivery speed', async () => {
        const res = await request(app)
            .get('/api/v1/shipping-charge')
            .query({ warehouseId: 1, customerId: 1, deliverySpeed: 'superfast' });

        expect(res.statusCode).toBe(400);
    });

    test('should return 400 when customerId is missing', async () => {
        const res = await request(app)
            .get('/api/v1/shipping-charge')
            .query({ warehouseId: 1, deliverySpeed: 'standard' });

        expect(res.statusCode).toBe(400);
    });
});

describe('POST /api/v1/shipping-charge/calculate', () => {
    test('should calculate total shipping charge', async () => {
        const res = await request(app)
            .post('/api/v1/shipping-charge/calculate')
            .send({ sellerId: 1, customerId: 1, deliverySpeed: 'standard' });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('shippingCharge');
        expect(res.body.data).toHaveProperty('nearestWarehouse');
        expect(res.body.data.nearestWarehouse).toHaveProperty('warehouseId');
        expect(res.body.data).toHaveProperty('transportMode');
        expect(res.body.data).toHaveProperty('breakdown');
    });

    test('should work with express delivery', async () => {
        const res = await request(app)
            .post('/api/v1/shipping-charge/calculate')
            .send({ sellerId: 1, customerId: 1, deliverySpeed: 'express' });

        expect(res.statusCode).toBe(200);
        expect(res.body.data.deliverySpeed).toBe('express');
        expect(res.body.data.breakdown.expressSurcharge).toBeGreaterThan(0);
    });

    test('should return 400 when required fields are missing', async () => {
        const res = await request(app)
            .post('/api/v1/shipping-charge/calculate')
            .send({ sellerId: 1 });

        expect(res.statusCode).toBe(400);
    });

    test('should return 404 for non-existent seller', async () => {
        const res = await request(app)
            .post('/api/v1/shipping-charge/calculate')
            .send({ sellerId: 999, customerId: 1, deliverySpeed: 'standard' });

        expect(res.statusCode).toBe(404);
    });
});

describe('404 Handler', () => {
    test('should return 404 for unknown routes', async () => {
        const res = await request(app).get('/api/v1/unknown');
        expect(res.statusCode).toBe(404);
    });
});
