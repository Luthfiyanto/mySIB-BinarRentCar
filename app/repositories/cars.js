const { Car, User } = require("./../models");

exports.getListCars = () => {
  return Car.findAll({
    attributes: { exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"] },
  });
};

exports.getFilteredListCars = (params) => {
  return Car.findAll({ where: params, attributes: { exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"] } });
};

exports.create = (body, user_id) => {
  return Car.create({ ...body, createdBy: user_id });
};

exports.findByPk = (id) => {
  return Car.findByPk(id, {
    include: [
      {
        model: User,
        as: "created",
      },
      {
        model: User,
        as: "updated",
      },
      {
        model: User,
        as: "deleted",
      },
    ],
    attributes: { exclude: ["createdBy", "updatedBy", "deletedBy", "deletedAt"] },
  });
};

exports.update = (id, payload, userId) => {
  return Car.update({ ...payload, updatedBy: userId }, { where: { id: id }, returning: true, paranoid: false });
};

exports.delete = (id) => {
  return Car.destroy({ where: { id: id } });
};
