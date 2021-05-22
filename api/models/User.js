const Sequelize = require('sequelize');
const connection = require('../db/connection');

const User = connection.define("Users", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		first_name: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		last_name: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		email: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		username: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		password: { 
			type: Sequelize.STRING(100),
			allowNull: false
		},
		role: {
			type: Sequelize.STRING(12),
			defaultValue: "NOSUPERUSER"
		} 
})

module.exports = User;
