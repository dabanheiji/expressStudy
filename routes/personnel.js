const router = require('express').Router();
const db = require('../utils/db.js');
const { tokenMiddleware } = require('../middleware/authMiddleware.js');

/**
*查询员工列表
*/
router.get('/getPersonnels', async function(req, res, next){
	const { page_size, page_num } = req.query;
	if(page_num && page_size){
		let countSql = `select count(*) from personnels inner join jobs on personnels.job_id = jobs.job_id;`;
		let sql = `select * from personnels inner join jobs on personnels.job_id = jobs.job_id limit ${ page_size * (page_num - 1)}, ${ page_size };`;
		const result = await db(sql);
		const total = await db(countSql);
		const page = {
			page_num,
			page_size,
			total: total[0]['count(*)']
		}
		if(result){
			res.json({
				code: 200,
				data: result,
				page,
				message:"查询成功"
			});
		}else{
			res.json({
				code: 402,
				message:"请求失败"
			})
		}
	}else{
		res.json({
			code:400,
			message:"参数错误"
		})
	}
})



module.exports = router;
