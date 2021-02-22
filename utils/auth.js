const jwt = require('jsonwebtoken');

const secretKey = "secret key"; //密钥

function createToken(origin){
	const token = jwt.sign(origin, secretKey, {
		expiresIn: 60 * 60 * 2, // 2h
	})

	return token;
}

function decodeToken(token){
	let auth;
	jwt.verify(token, secretKey, function(err, decoded) {
		auth = err ? false : decoded;
	})
	return auth;
}

module.exports = {
	createToken,
	decodeToken
}