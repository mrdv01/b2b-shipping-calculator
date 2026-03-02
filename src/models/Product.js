const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Seller = require('./Seller');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Weight in kilograms',
    },
    dimensionL: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Length in cm',
    },
    dimensionW: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Width in cm',
    },
    dimensionH: {
        type: DataTypes.FLOAT,
        allowNull: false,
        comment: 'Height in cm',
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Seller,
            key: 'id',
        },
    },
}, {
    tableName: 'products',
    timestamps: true,
});

// Associations
Product.belongsTo(Seller, { foreignKey: 'sellerId', as: 'seller' });
Seller.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });

module.exports = Product;
