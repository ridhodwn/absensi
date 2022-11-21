'use strict';
var bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require('../data.json');
    data = data.map(el => {
      let { nama, email, npp, npp_supervisor, password } = el;
      let createdAt = new Date();
      let updatedAt = new Date();
      var salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
      return { nama, email, npp, npp_supervisor, password, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
