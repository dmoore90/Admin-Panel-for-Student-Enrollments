'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Enrollments', { 
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
        student_name: {
          type: Sequelize.STRING(45),
          allowNull: false
        },
        username: {
          type:Sequelize.STRING(45),
          allowNull: false
        }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Enrollments');
  }
};
