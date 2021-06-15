const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("carna_db", "user", "pass", {
	// process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_ROOT_PASSWORD
	// host: process.env.MYSQL_HOST || 'localhost',
	// port: process.env.MYSQL_LOCAL_PORT,
	host: "carna_mysqldb_1",
	port: "3306",
	dialect: "mysql",
	define: {
		timestamps: false
	}
});
console.log(process.env.MYSQL_LOCAL_PORT)

module.exports = sequelize;