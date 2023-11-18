"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Cars", "createdBy", {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: "7f1e8ec2-e47a-4053-b845-85c8ca895ab0",
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Cars", "updatedBy", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Cars", "deletedBy", {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
    });
  },

  async down(_queryInterface, _Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
