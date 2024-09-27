const sequelize = require('sequelize');

const db = new sequelize.Sequelize({
	database: 'sone',
	dialect: 'mysql',
	host: 'localhost',
	username: 'root',
	password: 'root',
});

module.exports = { db };
