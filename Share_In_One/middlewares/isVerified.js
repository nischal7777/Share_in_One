const { verify } = require('jsonwebtoken');

const isVerified = (req, res, next) => {
	const accessToken = req.cookies['token'];

	if (!accessToken) {
		return res.status(400).json({ error: 'User not Authenticated!' });
	}

	verify(accessToken, 'jwtsecretplschange', (err, payload) => {
		if (err) return res.status(400).json({ error: err });
		req.user = payload.id;
		next();
	});
};

module.exports = { isVerified };
