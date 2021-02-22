const router = require('express').Router();
const db = require('../utils/db.js');

/**
*获取所有职位
*/
router.get('/getJobList', async function (req, res, next) {
	const sql = `select * from jobs where deleted = 0;`;
	const result = await db(sql);
	res.json({
		code: 200,
		data: result,
		message: "请求成功"
	}) 
})

/**
*添加职位
*/
router.post('/addJob', async function (req, res, next) {
	const { job_name } = req.body;
	if( job_name ){
		const selectSql = `select job_id, job_name, deleted from jobs where job_name = '${ job_name }';`;
		const jobs = await db(selectSql);
		const isExist = jobs.length && jobs[0].deleted === 0;
		if(!isExist){
			const isDeleted = jobs.length && jobs[0].deleted === 1;
			const sql = isDeleted ? `update jobs set deleted = 0 where job_id = ${ jobs[0].job_id };` : `insert into jobs(job_name) values( '${job_name}' );`;
			const result = await db(sql);
			if(result){
				res.json({
					code: 200,
					message:"添加成功"
				})
			}
		}else{
			res.json({
				code:402,
				message:"该职位已存在"
			})
		}
	}else{
		res.json({
			code:400,
			message:"参数错误"
		})
	}
})

/**
*删除岗位
*/
router.post('/delJob', async function (req, res, next) {
	const { job_ids } = req.body;
	if(job_ids){
		const sql = `update jobs set deleted = 1 where job_id in (${ job_ids });`;
		const result = await db(sql);
		if(result){
			res.json({
				code: 200,
				message:"删除成功"
			})
		}
	}else{
		res.json({
			code:400,
			message:"参数错误"
		})
	}
})

/**
*修改职位名称
*/
router.post('/setJob', async function (req, res, next) {
	const { job_id, job_name } = req.body;
	if(job_id && job_name){
		const selectSql = `select job_id from jobs where job_name = '${ job_name }' and deleted = 0;`;
		const jobs = await db(selectSql);
		if(jobs.length){
			res.json({
				code: 402,
				message: "该职位已存在"
			})
		}else{
			const sql = `update jobs set job_name = '${ job_name }' where job_id = ${ job_id };`;
			const result = await db(sql);
			if(result){
				res.json({
					code:200,
					message:"修改成功"
				})
			}
		}
	}else{
		res.json({
			code:400,
			message:"参数错误"
		})
	}
})


module.exports = router;