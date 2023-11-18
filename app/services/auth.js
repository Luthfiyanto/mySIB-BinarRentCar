const bcrypt = require("bcrypt");
const SALT = 10;
const jwt = require("jsonwebtoken");
const userRepository = require("./../repositories/user");
const ApplicationError = require("./../../config/errors/ApplicationError");

const encryptedPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, SALT);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

const checkPassword = async (password, hash) => {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const JWT_SECRET_KEY = "FSW1";
const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

const authorize = async (bearerToken) => {
  try {
    if (!bearerToken) throw new ApplicationError("Authorization Header required", 400);

    const token = bearerToken.split("Bearer ")[1];
    const decoded = verifyToken(token);
    const { id } = decoded;

    const user = await userRepository.findByPk(id);

    if (!user) throw new ApplicationError("Unauthorized", 401);

    return user;
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500);
  }
};

module.exports = { encryptedPassword, checkPassword, createToken, verifyToken, authorize };
