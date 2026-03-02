const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Warehouse = sequelize.define('Warehouse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'warehouses',
    timestamps: true,
});

module.exports = Warehouse;
