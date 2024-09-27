const bcryptjs = require('bcryptjs');
const { createTokens } = require('../JWT');
const { Users } = require('../models/Users');

const adminRegisterController = (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	bcryptjs.hash(password, 10).then((hash) => {
		Users.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: hash,
			isAdmin: true,
		})
			.then(() => {
				res.json('ADMIN REGISTERED :)');
			})
			.catch((err) => {
				if (err) {
					res.status(400).json({ error: err });
				}
			});
	});
};

const adminLoginController = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Users.findOne({ where: { email: email } });

		if (!user) res.status(400).json({ error: "Admin Doesn't Exist" });
		const passwordStatus = await bcryptjs.compare(password, user.password);
		if (!passwordStatus) {
			return res.status(400).json({ error: 'Password not match' });
		}
		const admin = user.isAdmin;
		if (!admin) {
			return res.status(400).json({ error: 'USER NOT ADMIN' });
		}
		console.log(admin);
		const accessToken = createTokens(user);
		res.cookie('admin-token', accessToken, {
			httpOnly: true,
			maxAge: 86400000,
		});
		return res.status(200).json({ token: accessToken });
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error Occured' });
	}
};

const adminLogoutController = (req, res) => {
	res.clearCookie('admin-token').send();
};

module.exports = {
	adminRegisterController,
	adminLoginController,
	adminLogoutController,
};
