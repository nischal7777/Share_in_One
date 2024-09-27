const express = require('express');
const { db } = require('./db');
const { Users } = require('./models/Users');
const bcryptjs = require('bcryptjs');
const { createTokens } = require('./JWT');
const cors = require('cors');
const { isVerified } = require('./middlewares/isVerified');
const cookieParser = require('cookie-parser');
const { getNepseShares } = require('./getNepseShares');
const { getMeroLaganiData } = require('./meroLaganiService');
const { Portfolio } = require('./models/Portfolio');
const { userRouter } = require('./routes/User');
const { adminRouter } = require('./routes/Admin');
const { portfolioRouter } = require('./routes/Portfolio');
const { Router } = require('express');
const { default: axios } = require('axios');
const { watchlistRouter } = require('./routes/Watchlist');
const { Stock } = require('./models/Stock');
const { convertModelToJSON } = require('./utils/convertModelToJSON');
const { stockRouter } = require('./routes/Stock');
const nodeCron = require('node-cron');
const { handleLoss } = require('./controllers/Target');
const { targetRouter } = require('./routes/Target');

const app = express();
const router = Router();

const whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000'];
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		if (whitelist.indexOf(origin) === -1) {
			return callback(new Error('Not allowed by CORS'), false);
		}
		return callback(null, true);
	},
	credentials: true,
};

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

(async () => {
	try {
		await db.sync();
		await db.authenticate();
		console.log(`Connection successfully established with database`);
		// nodeCron.schedule('*/1 * * * *', handleLoss, { scheduled: true });
		nodeCron.schedule('*/10 * * * * *', handleLoss, { scheduled: true });
	} catch (error) {
		console.log(`Unable to establish connection with database: ${error}`);
	}
})();

app.get('/', (req, res) => {
	res.send('<h1>Hello World</h1>');
});

//API routes
app.use('/api', router);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/portfolio', portfolioRouter);
router.use('/watchlist', watchlistRouter);
router.use('/stock', stockRouter);
router.use('/target', targetRouter);

app.get('/nepse-data', async (req, res) => {
	const nepseData = await getNepseShares();
	const totalData = [];
	for (const item of nepseData) {
		const stockItem = await Stock.create({
			company_name: item.symbol,
			high: item.high,
			low: item.low,
			open: item.open,
			ltp: item.ltp,
			volume: item.volume,
			percentage_change: item.percentage_change,
			createdAt: String(new Date().getTime()),
		});
		const addedStock = convertModelToJSON(stockItem);
		totalData.push(addedStock);
	}
	console.log(totalData);
	return res.status(200).json(totalData);
});

app.get('/watch/companies', async (req, res) => {
	const nepseData = await getNepseShares();
	const validCompanies = [];
	nepseData.forEach((company) => {
		validCompanies.push(company.symbol);
	});
	return res.status(200).json(validCompanies);
});

app.get('/nepse-companies', async (req, res) => {
	const nepseData = await getNepseShares();
	const { data } = await axios('http://localhost:5555', {
		method: 'GET',
	});
	const unFilteredCompanies = data.company_list;
	const validCompanies = [];
	nepseData.forEach((company) => {
		validCompanies.push(company.symbol);
	});
	const filteredCompanies = unFilteredCompanies.filter((value) =>
		validCompanies.includes(value)
	);
	return res.json(filteredCompanies);
});

app.get('/stock-analysis', isVerified, async (req, res) => {
	try {
		const nepseData = await getNepseShares();
		const items = await Portfolio.findAll({
			where: { userId: Number(req.user) },
		});
		let totalUnits = 0;
		let totalInvested = 0;
		items.forEach((item) => {
			totalUnits += item.units;
			const invested = item.units * item.buying_price;
			totalInvested += invested;
		});
		// const totalUnits = items.reduce((a, b) => a.units + b.units, 0);
		res.status(200).json({ totalUnits, totalInvested });
	} catch (error) {
		return res.status(500).json({ error: 'An Internal Error Occured' });
	}
});

nodeCron.schedule('5 * * * * *', () => {}, {
	scheduled: true,
});

app.listen(5000, () => {
	console.log(`Server listening at http://localhost:5000`);
});
