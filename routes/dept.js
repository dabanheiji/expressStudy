const router = require('express').Router();
const db = require('../utils/db.js');

/**
*查询部门列表
*/
router.get('/getDeptList', async function (req, res, next) {
	const sql = `select dept_id, dept_name from depts where deleted = 0;`;
	const result = await db(sql);
	if(result){
		res.json({
			code:200,
			data:result,
			message: "查询成功"
		})
	}
})

/**
*添加部门
*/
router.post('/addDept', async function (req, res, next) {
	const { dept_name } = req.body;
	if( dept_name ){
		const selectSql = `select dept_id, dept_name, deleted from depts where dept_name = '${dept_name}';`;
		const depts = await db(selectSql);
		console.log(depts)
		const isExist = depts.length && depts[0].deleted === 0;
		if(!isExist){
			const isDeleted = depts.length && depts[0].deleted === 1;
			const sql = isDeleted ? `update depts set deleted = 0 where dept_name = '${dept_name}';` : `insert into depts( dept_name, deleted ) values('${dept_name}', 0);`;
			const result = await db(sql);
			if(result){
				res.json({
					code: 200,
					message: "添加成功"
				})
			}
		}else{
			res.json({
				code: 402,
				message:"该部门已存在"
			})
		}
	}else{
		res.json({
			code: 400,
			message: "参数错误"
		})
	}
})


/**
*删除部门
*/
router.post('/delDept', async function (req, res, next) {
	const { dept_ids } = req.body;
	if(dept_ids){
		const sql = `update depts set deleted = 1 where dept_id in (${dept_ids});`;
		const result = await db(sql);
		if(result){
			res.json({
				code:200,
				message:"删除成功"
			})
		}
	}else{
		res.json({
			code: 400,
			message: "参数错误"
		})
	}
})

/**
*编辑部门
*/
router.post('/setDept', async function (req, res, next) {
	const { dept_id, dept_name } = req.body;
	if(dept_id && dept_name){
		const selectSql = `select dept_id from depts where dept_name = '${dept_name}' and deleted = 0;`;
		const depts = await db(selectSql);
		if(depts.length){
			res.json({
				code:402,
				message:"该部门名称已被使用"
			})
		}else{
			const sql = `update depts set dept_name = '${dept_name}' where dept_id = ${dept_id}`;
			const result = await db(sql);
			if(result){
				res.json({
					code: 200,
					message: "编辑成功"
				})
			}
		}
	}else{
		res.json({
			code: 400,
			message:"参数错误"
		})
	}
})

module.exports = router;