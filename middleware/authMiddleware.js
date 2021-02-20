const { decodeToken } = require('../utils/auth.js');

function tokenMiddleware(req, res, next){
	const { token } = req.headers;
	const auth = decodeToken(token);
	if(auth){
		next();
	}else{
		res.json({
			code: 401,
			message:"未登录"
		})
	}
}

module.exports = {
	tokenMiddleware
}