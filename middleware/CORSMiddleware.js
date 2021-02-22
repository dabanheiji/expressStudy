function cors (req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header('Access-Control-Allow-Credentials', true);
	res.header("X-Powered-By", ' 3.2.1');
	next();
}

module.exports = cors;