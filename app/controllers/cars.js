const carServices = require("./../services/cars");

const { v4: uuidv4 } = require("uuid");

// Middleware: Find n Set
const findAndSetById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const car = await carServices.getCarById(id);
    req.car = car;
    next();
  } catch (error) {
    res.status(error.statusCode).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// GET '/cars
const list = async (req, res) => {
  try {
    const data = await carServices.getList(req.query);
    return res.json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// GET '/cars/:id'
const detail = (req, res) => {
  const data = req.car;
  res.status(200).json({
    status: "OK",
    message: "Success",
    data,
  });
};

// POST '/cars'
const create = async (req, res) => {
  try {
    const body = { id: uuidv4(), ...req.body, createAt: new Date(), updateAt: new Date() };
    const { id: user_id } = req.user;

    const data = await carServices.createCar(body, user_id);
    return res.status(201).json({
      status: "OK",
      message: "Created Success",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// PUT '/cars/:id
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { id: userId } = req.user;
    const body = { ...req.body, updateAt: new Date() };

    const data = await carServices.updateCar(id, body, userId);

    return res.status(201).json({
      status: "OK",
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "Failed",
      message: error.message,
    });
  }
};

// DELETE '/cars/:id
const destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const { id: userId } = req.user;
    await carServices.deleteCar(id, userId);
    return res.status(200).json({
      status: "OK",
      message: "Deleted Successful",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      status: "Failed",
      message: `Failed to delete: ${error.message}`,
    });
  }
};

module.exports = {
  list,
  detail,
  create,
  update,
  destroy,
  findAndSetById,
};
