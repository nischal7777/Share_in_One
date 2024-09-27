const { db } = require('../db');
const { DataTypes } = require('sequelize');
const sequelize = require('sequelize');

const Stock = db.define('Stocks', {
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	high: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	low: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	open: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	ltp: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	volume: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	percentage_change: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = { Stock };
