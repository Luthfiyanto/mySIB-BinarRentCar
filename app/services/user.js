const ApplicationError = require("./../../config/errors/ApplicationError");
const authService = require("./auth");
const userRepository = require("./../repositories/user");

exports.create = async (payload, isAdmin) => {
  try {
    const { email, password, name, address, phoneNumber } = payload;

    if (!email || !password) throw new ApplicationError(`Please input email and password`, 400);

    const encryptedPassword = await authService.encryptedPassword(password);

    const user = await userRepository.create({
      email,
      encryptedPassword,
      name,
      phoneNumber,
      address,
      role: isAdmin ? "ADMIN" : "MEMBER",
    });
    return user;
  } catch (error) {
    throw new ApplicationError(`Failed to add new user ${error.message}`, error.statusCode || 500);
  }
};

exports.checkUser = async (credential) => {
  try {
    const { email, password } = credential;

    if (!email || !password) throw new ApplicationError(`Please input email and password`, 400);

    const user = await userRepository.findUserByEmail(email);
    if (!user) throw new ApplicationError(`Email is invalid`, 401);

    const checkPassword = await authService.checkPassword(password, user.encryptedPassword);
    if (!checkPassword) throw new ApplicationError(`Password is invalid`, 401);

    const token = authService.createToken({ id: user.id });

    const userWithToken = { ...user.dataValues, token };

    return userWithToken;
  } catch (error) {
    throw new ApplicationError(error.message, error.statusCode || 500);
  }
};
