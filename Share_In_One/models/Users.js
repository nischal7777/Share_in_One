const { db } = require('../db');
const { DataTypes } = require('sequelize');

const Users = db.define('Users', {
	firstname: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	lastname: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		unique: false,
		defaultValue: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = { Users };
