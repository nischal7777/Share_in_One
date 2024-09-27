const { Router } = require('express');
const {
	getDistinctCompanies,
	getCompanyCandleData,
} = require('../controllers/Stock');
const { isVerified } = require('../middlewares/isVerified');

const stockRouter = Router();

stockRouter.get('/companies', getDistinctCompanies);
stockRouter.get('/company/:companyName', getCompanyCandleData);

module.exports = { stockRouter };
