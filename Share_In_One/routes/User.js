const { Router } = require('express');
const {
	userLoginController,
	userRegisterController,
	userLogoutController,
	userListController,
	userActiveController,
} = require('../controllers/User');
const { isVerified } = require('../middlewares/isVerified');

const userRouter = Router();

userRouter.post('/login', userLoginController);
userRouter.post('/register', userRegisterController);
userRouter.get('/logout', userLogoutController);
userRouter.get('/all', userListController);
userRouter.get('/', isVerified, userActiveController);

module.exports = { userRouter };
