/** @type {import("express").RequestHandler} */

const { Portfolio } = require('../models/Portfolio');
const { convertModelToJSON } = require('../utils/convertModelToJSON');

const addStock = async (req, res) => {
	try {
		const { company, units, buyingPrice, date } = req.body;
		const portfolioItem = await Portfolio.create({
			company_name: company,
			units: units,
			buying_price: buyingPrice,
			date: date,
			userId: Number(req.user),
		});
		return res.status(200).json(portfolioItem);
	} catch (error) {
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

const getStocks = async (req, res) => {
	try {
		const items = await Portfolio.findAll({
			where: { userId: Number(req.user) },
		});
		return res.status(200).json(items);
	} catch (error) {
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};
/** @type {import("express").RequestHandler} */

const getStock = async (req, res) => {
	const { stockId } = req.params;
	try {
		const item = await Portfolio.findOne({ where: { id: stockId } });
		if (!item) {
			return res
				.status(404)
				.json({ error: `${stockId} stockId does not exists` });
		}
		return res.status(200).json(convertModelToJSON(item));
	} catch (error) {
		return res
			.status(404)
			.json({ error: `${stockId} stockId does not exists` });
	}
};

/** @type {import("express").RequestHandler} */
const updateStock = async (req, res) => {
	const { stockId } = req.params;
	const { company_name, units, buying_price, date } = req.body;
	try {
		const result = await Portfolio.update(
			{
				company_name: company_name,
				units: units,
				buying_price: buying_price,
				date: date,
			},
			{ where: { id: stockId } }
		);
		const item = await Portfolio.findOne({ where: { id: stockId } });
		if (!item) {
			return res
				.status(404)
				.json({ error: `${stockId} stockId does not exists` });
		}
		return res.status(200).json(convertModelToJSON(item));
	} catch (error) {
		return res
			.status(404)
			.json({ error: `${stockId} stockId does not exists` });
	}
};

/** @type {import("express").RequestHandler} */
const deleteStock = async (req, res) => {
	const { stockId } = req.params;
	try {
		const item = await Portfolio.findOne({ where: { id: stockId } });
		if (item === null) {
			return res.status(404).json({ error: `stockId of ${stockId} not found` });
		}
		await Portfolio.destroy({ where: { id: stockId } });
		return res
			.status(200)
			.json({ message: `stockId of ${stockId} successfully deleted` });
	} catch (error) {
		return res
			.status(404)
			.json({ error: `${stockId} stockId does not exists` });
	}
};

module.exports = { addStock, getStock, getStocks, deleteStock, updateStock };
