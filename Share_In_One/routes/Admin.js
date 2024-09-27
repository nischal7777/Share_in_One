const { Router } = require('express');
const {
	adminRegisterController,
	adminLoginController,
} = require('../controllers/Admin');

const adminRouter = Router();

adminRouter.post('/register', adminRegisterController);
adminRouter.post('/login', adminLoginController);
adminRouter.get('/logout', adminRegisterController);

module.exports = { adminRouter };
