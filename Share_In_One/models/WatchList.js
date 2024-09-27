const { db } = require('../db');
const { DataTypes } = require('sequelize');
const { Users } = require('./Users');

const Watchlist = db.define('Watchlist', {
	company_name: {
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

module.exports = { Watchlist };
