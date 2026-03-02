require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
const seedDatabase = require('./seeders/seed');

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connected successfully');

        // Sync all models (creates tables if they don't exist)
        await sequelize.sync();
        console.log('Database tables synced');

        // Seed sample data
        await seedDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`API Base: http://localhost:${PORT}/api/v1`);
            console.log('');
            console.log('Available endpoints:');
            console.log(`  GET  /api/v1/warehouse/nearest?sellerId=1&productId=1`);
            console.log(`  GET  /api/v1/shipping-charge?warehouseId=1&customerId=1&deliverySpeed=standard`);
            console.log(`  POST /api/v1/shipping-charge/calculate`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

start();
