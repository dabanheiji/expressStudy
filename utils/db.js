const mysql = require('mysql');
const { mysql_config } = require('../config/config.js');

const connection = mysql.createConnection(mysql_config);

connection.connect();

async function db (sql) {
	return new Promise(function(resolve, reject) {
		connection.query(sql, async function(err, res) {
			if(err){
				console.log(err);
				return reject(false);
			}
			resolve(res);
		})
	})
}

module.exports = db;