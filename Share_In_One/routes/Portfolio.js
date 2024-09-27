const { Router } = require('express');
const {
	getStock,
	getStocks,
	addStock,
	updateStock,
	deleteStock,
} = require('../controllers/Portfolio');
const { isVerified } = require('../middlewares/isVerified');

const portfolioRouter = Router();

portfolioRouter.get('/:stockId', isVerified, getStock);
portfolioRouter.get('/', isVerified, getStocks);
portfolioRouter.post('/', isVerified, addStock);
portfolioRouter.put('/:stockId', isVerified, updateStock);
portfolioRouter.delete('/:stockId', isVerified, deleteStock);

module.exports = { portfolioRouter };
