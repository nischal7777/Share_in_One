const bcryptjs = require('bcryptjs');
const { createTokens } = require('../JWT');
const { Users } = require('../models/Users');
const { convertModelToJSON } = require('../utils/convertModelToJSON');

const userRegisterController = (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	bcryptjs.hash(password, 10).then((hash) => {
		Users.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: hash,
			isAdmin: false,
		})
			.then(() => {
				res.json('USER REGISTERED :)');
			})
			.catch((err) => {
				if (err) {
					res.status(400).json({ error: err });
				}
			});
	});
};

const userLoginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Users.findOne({ where: { email: email } });

		if (!user) res.status(400).json({ error: "User Doesn't Exist" });
		const passwordStatus = await bcryptjs.compare(password, user.password);
		if (!passwordStatus) {
			return res.status(400).json({ error: 'Password not match' });
		}
		const accessToken = createTokens(user);
		res.cookie('token', accessToken, {
			httpOnly: true,
			maxAge: 86400000,
		});
		return res.status(200).json({ token: accessToken });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: 'Internal Server Error Occured' });
	}
};

const userLogoutController = (req, res) => {
	res.clearCookie('token').json({ message: 'user logged out' });
};

const userListController = async (req, res) => {
	const rawUsers = await Users.findAll({
		attributes: { exclude: ['password', 'updatedAt'] },
		raw: true,
	});
	if (!rawUsers) return res.status(500).json({ error: 'server error' });
	const users = convertModelToJSON(rawUsers);
	return res.status(200).json(users);
};

const userActiveController = async (req, res) => {
	const rawUser = await Users.findOne({
		where: { id: req.user },
		attributes: { exclude: ['password', 'updatedAt'] },
	});
	if (!rawUser) res.status(400).json({ error: "User Doesn't Exist" });
	const user = convertModelToJSON(rawUser);
	return res.status(200).json(user);
};

module.exports = {
	userLoginController,
	userRegisterController,
	userLogoutController,
	userListController,
	userActiveController,
};
