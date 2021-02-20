var express = require('express');
const md5 = require('js-md5');
const db = require('../utils/db.js');
const { createToken } = require('../utils/auth.js');
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
		const sql = `select id,pwd from users where username = '${username}';`;
		const result = await db(sql);
		if(result.length){
			if(md5(password) === result[0].pwd){
				const origin = {
					username,
					id: result[0].id
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
router.post('/register', async function (req, res, next) {
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


module.exports = router;