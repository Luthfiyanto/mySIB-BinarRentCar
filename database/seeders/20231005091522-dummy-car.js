"use strict";

const cars = require("../../data/cars.json");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    return queryInterface.bulkInsert("Cars", cars); // data dummy menggunakan data cars dari chapter sebelumnya
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
