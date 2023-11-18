"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        email: "superadmin@gmail.com",
        encryptedPassword: bcrypt.hashSync("superadmin123", 10),
        name: "Superadmin",
        address: "Semarang",
        phoneNumber: "085822361098",
        role: "SUPERADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: "admin123@gmail.com",
        encryptedPassword: bcrypt.hashSync("admin123", 10),
        name: "Admin Asik",
        address: "Semarang",
        phoneNumber: "085822361098",
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
