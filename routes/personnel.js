const router = require('express').Router();
const db = require('../utils/db.js');
const { createTime, formatDate } = require('../utils/date.js');
const { tokenMiddleware } = require('../middleware/authMiddleware.js');

/**
*查询员工列表
*/
router.get('/getPersonnels', async function(req, res, next){
	const { page_size, page_num } = req.query;
	if(page_num && page_size){
		let countSql = `select count(*) from personnels inner join jobs on personnels.job_id = jobs.job_id where personnels.deleted = 0;`;
		let sql = `select * from personnels inner join jobs on personnels.job_id = jobs.job_id inner join depts on personnels.dept_id = depts.dept_id where personnels.deleted = 0 limit ${ page_size * (page_num - 1)}, ${ page_size };`;
		const result = await db(sql);
		const total = await db(countSql);
		const page = {
			page_num,
			page_size,
			total: total[0]['count(*)']
		}
		if(result){
			result.forEach(item => {
				item.sex = item.sex === 0 ? '男' : '女';
				item.create_time = formatDate(item.create_time);
			})
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

/**
*添加员工
*/
router.post('/addPersonnel', async function(req, res, next){
	const { 
		personnel_name,
		sex,
		job_id
	} = req.body;
	if(personnel_name && job_id && sex){
		const create_time = createTime();
		const sql = `insert into personnels(personnel_name, job_id, create_time, sex) values('${personnel_name}', ${job_id}, '${create_time}', ${sex});`;
		const result = await db(sql);
		if(result){
			res.json({
				code: 200,
				message:"添加成功"
			})
		}
	}else{
		res.json({
			code: 400,
			message:"参数错误"
		})
	}
})

/**
*移除员工
*/
router.post('/delPersonnel', async function(req, res, next){
	const { personnel_ids } = req.body;
	if(personnel_ids){
		const sql = `update personnels set deleted = 1 where personnel_id in ( ${personnel_ids} )`;
		const result = await db(sql);
		if(result){
			res.json({
				code: 200,
				message: "删除成功"
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
*编辑员工信息
*/
router.post('/setPersonnel', async function(req, res, next){
	const {
		personnel_id,
		dept_id,
		job_id
	} = req.body;
	if(personnel_id && dept_id && job_id){
		const sql = `update personnels set dept_id = ${dept_id}, job_id = ${job_id} where personnel_id = ${personnel_id};`;
		const result = await db(sql);
		if(result){
			res.json({
				code:200,
				message:"编辑成功"
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
