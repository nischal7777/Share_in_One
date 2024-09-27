const { Router } = require('express');
const {
	addToWatchlist,
	deleteFromWatchlist,
	getAllWatchlist,
} = require('../controllers/Watchlist');
const { isVerified } = require('../middlewares/isVerified');

const watchlistRouter = Router();

watchlistRouter.post('/', isVerified, addToWatchlist);
watchlistRouter.delete('/:stockId', isVerified, deleteFromWatchlist);
watchlistRouter.get('/', isVerified, getAllWatchlist);

module.exports = { watchlistRouter };
