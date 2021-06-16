const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("carna_db", "user", "pass", {
	host: "carna_mysqldb_1",
	port: "3306",
	dialect: "mysql",
	define: {
		timestamps: false
	}
});

module.exports = sequelize;