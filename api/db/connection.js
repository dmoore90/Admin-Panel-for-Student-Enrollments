const Sequelize = require("sequelize");

const sequelize = new Sequelize("carna_db", "user", "pass", {
	host: 'localhost',
	dialect: 'mysql',
	define: {
		timestamps: false
	}
});

module.exports = sequelize;