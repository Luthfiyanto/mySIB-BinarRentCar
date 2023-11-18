"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "created",
      });
      this.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "updated",
      });
      this.belongsTo(models.User, {
        foreignKey: "deletedBy",
        as: "deleted",
      });
    }
  }
  Car.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      rentPerDay: DataTypes.INTEGER,
      description: DataTypes.STRING,
      availableAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );
  return Car;
};
