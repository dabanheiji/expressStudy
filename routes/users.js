var express = require('express');
const md5 = require('js-md5');
const db = require('../utils/db.js');
const { createToken, decodeToken } = require('../utils/auth.js');
const { tokenMiddleware } = require('../middleware/authMiddleware.js');

var router = express.Router();

/**
*login
*@params {String} username
*@params {String} password
*/
router.post('/login', async function(req, res, next) {
	const { username, password } = req.body;
	if(username && password){
		const sql = `select id,pwd,roles.role_id,role_name from users inner join roles on users.role_id = roles.role_id where username = '${username}';`;
		const result = await db(sql);
		if(result.length){
			if(md5(password) === result[0].pwd){
				const origin = {
					username,
					id: result[0].id,
					role_id: result[0].role_id,
					role_name: result[0].role_name
				}
				const token = createToken(origin);
				res.json({
					code: 200,
					token,
					message: "登录成功"
				})
			}
		}else{
			res.json({
				code: 402,
				message: "用户不存在"
			})
		}
	}else{
		res.json({
			code: 400,
			message:"参数有误"
		});
	}
})

/**
*register
*@params {String} username
*@params {String} password
*/
router.post('/register',tokenMiddleware, async function (req, res, next) {
	const { username, password } = req.body;
	if(username && password){
		const selectSql = `select id from users where username = '${username}';`;
		const users = await db(selectSql);
		const isExist = users.length;
		if(isExist){
			res.json({
				code:402,
				message:"用户名已存在"
			})
		}else{
			const sql = `insert into users( username, pwd ) values( '${username}', '${ md5(password) }' );`;
			const result = await db(sql);
			if(result){
				res.json({
					code: 200,
					message:"注册成功"
				})
			}
		}
	}else{
		res.json({
			code: 400,
			message:"参数有误"
		});
	}
})

/**
*获取用户信息
*/
router.get('/getUserInfo', tokenMiddleware , async function(req, res, next){
	const { token } = req.headers;
	const userInfo = decodeToken(token);
	res.json({
		code: 200,
		data: userInfo,
		message:"获取用户信息成功"
	})
})


module.exports = router;