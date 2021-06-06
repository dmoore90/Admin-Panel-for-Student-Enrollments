// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("carna_db", "user", "pass", {
// 	host: 'localhost',
// 	dialect: 'mysql',
// 	define: {
// 		timestamps: false
// 	}
// });

// module.exports = sequelize;

const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USERNAME, process.env.MYSQL_ROOT_PASSWORD, {
	host: process.env.MYSQL_HOST || 'localhost',
	port: process.env.MYSQL_LOCAL_PORT,
	dialect: 'mysql',
	define: {
		timestamps: false
	}
});

module.exports = sequelize;