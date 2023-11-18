const authService = require("./../services/auth");

exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const user = await authService.authorize(bearerToken);
    req.user = user;
    next();
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.isSuperAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "SUPERADMIN")
    return res.status(403).json({
      status: "Fail",
      message: "FORBIDDEN",
    });

  next();
};

exports.isSuperOrAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "SUPERADMIN" && role !== "ADMIN")
    return res.status(403).json({
      status: "Fail",
      message: "FORBIDDEN",
    });

  next();
};
