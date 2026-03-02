const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Seller = sequelize.define('Seller', {
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
    tableName: 'sellers',
    timestamps: true,
});

module.exports = Seller;
