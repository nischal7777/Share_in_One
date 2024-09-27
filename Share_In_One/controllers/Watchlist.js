/** @type {import("express").RequestHandler} */
const { convertModelToJSON } = require('../utils/convertModelToJSON');
const { Watchlist } = require('../models/WatchList');
const { getNepseShares } = require('../getNepseShares');

/** @type {import("express").RequestHandler} */
const addToWatchlist = async (req, res) => {
	try {
		const { stock } = req.body;
		const watchliststock = await Watchlist.create({
			company_name: stock,
			userId: Number(req.user),
		});
		const nepseData = await getNepseShares();
		const data = {};
		nepseData.forEach((item) => {
			console.log(item);
			if (item.Symbol === Watchlist.company_name) {
				console.log(item);
			}
		});
		return res.status(200).json(watchliststock);
	} catch (error) {
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
};

/** @type {import("express").RequestHandler} */
const getAllWatchlist = async (req, res) => {
	try {
		const list = await Watchlist.findAll({
			where: { userId: Number(req.user) },
		});
		const nepseData = await getNepseShares();
		let totalData = [];
		list.forEach((item) => {
			let data = convertModelToJSON(item);
			nepseData.forEach((stock) => {
				if (item.company_name === stock.symbol) {
					totalData.push(stock);
				}
			});
		});
		return res.status(200).json(totalData);
	} catch (error) {
		return res.status(500).json({ error: 'Internal Error Occured' });
	}
};

/** @type {import("express").RequestHandler} */
const deleteFromWatchlist = async (req, res) => {
	try {
		const { stockId } = req.params;
		const stock = await Watchlist.findOne({ where: { id: stockId } });
		if (!stock) return res.status(404).json({ error: `stock not found` });
		await Watchlist.destroy({ where: { id: stockId } });
		return res
			.status(200)
			.json({ message: `stock successfully deleted from watchlist` });
	} catch (error) {
		return res.status(404).json({ error: `stock does not exists` });
	}
};

module.exports = { addToWatchlist, getAllWatchlist, deleteFromWatchlist };
