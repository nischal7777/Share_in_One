const { db } = require('../db');
const { DataTypes } = require('sequelize');
const { Users } = require('./Users');

const Target = db.define('Targets', {
	company_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	percentage: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	changeType: {
		type: DataTypes.ENUM('profit', 'loss'),
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
});

module.exports = { Target };
