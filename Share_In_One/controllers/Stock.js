const { Sequelize } = require('sequelize');
const { Stock } = require('../models/Stock');
const { convertModelToJSON } = require('../utils/convertModelToJSON');

/** @type {import("express").RequestHandler} */
const getDistinctCompanies = async (req, res) => {
	console.log('api hit');
	try {
		const stocks = await Stock.findAll({
			attributes: [
				Sequelize.fn('DISTINCT', Sequelize.col('company_name')),
				'company_name',
			],
		});
		const parsedStocks = convertModelToJSON(stocks);
		const companies = [];
		parsedStocks.forEach((item) => {
			companies.push(item.company_name);
		});
		return res.status(200).json(companies);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

/** @type {import("express").RequestHandler} */
const getCompanyCandleData = async (req, res) => {
	const { companyName } = req.params;
	try {
		//[open, high, low, close]
		const stocks = await Stock.findAll({
			where: { company_name: companyName.toUpperCase() },
		});

		const structuredStocks = [];
		stocks.forEach((item) => {
			const data = {
				x: Number(item.createdAt),
				y: [
					Number(item.open),
					Number(item.high),
					Number(item.low),
					Number(item.ltp),
				],
			};
			structuredStocks.push(data);
		});

		return res.status(200).json(structuredStocks);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

module.exports = { getDistinctCompanies, getCompanyCandleData };
