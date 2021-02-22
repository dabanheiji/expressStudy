const router = require('express').Router();
const db = require('../utils/db.js');

/**
*修改用户权限
*/
router.post('/setUserRole', async function(req, res, next) {
	const { user_id, role_id } = req.body;
	if(user_id && role_id){
		const sql = `update users set role_id = ${role_id} where id = ${user_id};`;
		const result = await db(sql);
		if(result){
			res.json({
				code:200,
				message:"修改成功"
			})
		}else{
			res.json({
				code:402,
				message:"修改失败"
			})
		}
	}else{
		res.json({
			code:400,
			message:"参数有误"
		})
	}
})

module.exports = router;