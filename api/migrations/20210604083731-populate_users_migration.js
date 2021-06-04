'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      first_name: 'admin',
      last_name: 'admin',
      email: 'admin@admin.com',
      username: 'admin',
      password: '$2b$10$ga0LaQhFBmHyNx2iduLGIuxFcYKyWI9F1X4ww8XyoTrzgCIYM6D/a',
      role: 'SUPERUSER'
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
