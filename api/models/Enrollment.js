const Sequelize = require('sequelize');
const connection = require('../db/connection');

const Enrollment = connection.define("Enrollments", {
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
    username: {
      type:Sequelize.STRING(45),
      allowNull: false
    }
})

module.exports = Enrollment;
