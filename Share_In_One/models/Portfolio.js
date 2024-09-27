const { db } = require('../db');
const { DataTypes } = require('sequelize');
const { Users } = require('./Users');

const Portfolio = db.define('Portfolio', {
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	units: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	buying_price: {
		type: DataTypes.DECIMAL,
		allowNull: false,
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Users,
			key: 'id',
		},
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
});

module.exports = { Portfolio };
