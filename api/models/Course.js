const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Course = connection.define("Courses", {
		id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		course_name: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		beginning_date: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		ending_date: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		instructor: {
			type: Sequelize.STRING(100),
			allowNull: false
		} 
})

module.exports = Course;
