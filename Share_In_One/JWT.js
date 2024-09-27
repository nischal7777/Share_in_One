const { sign } = require('jsonwebtoken');

const createTokens = (user) => {
	const accessToken = sign(
		{ username: user.username, id: user.id },
		'jwtsecretplschange',
		{ expiresIn: '1440m' }
	);

	return accessToken;
};

module.exports = { createTokens };
