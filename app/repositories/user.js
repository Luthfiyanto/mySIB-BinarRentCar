const { User } = require("./../models");
const { v4: uuidv4 } = require("uuid");

exports.create = (payload) => {
  return User.create({ id: uuidv4(), ...payload });
};

exports.findUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

exports.findByPk = (id) => {
  return User.findByPk(id);
};
