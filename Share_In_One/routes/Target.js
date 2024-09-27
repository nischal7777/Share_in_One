const { Router } = require('express');
const { addTarget, getTargets } = require('../controllers/Target');
const { isVerified } = require('../middlewares/isVerified');

const targetRouter = Router();

targetRouter.post('/', isVerified, addTarget);
targetRouter.get('/', isVerified, getTargets);

module.exports = { targetRouter };
