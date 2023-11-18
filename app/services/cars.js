const carRepository = require("./../repositories/cars");
const ApplicationError = require("./../../config/errors/ApplicationError");

exports.getList = async (params) => {
  const { name, type, capacity, rentPerDay, availableAt } = params;

  try {
    let cars;
    if (!name && !type && !capacity && !rentPerDay && !availableAt) cars = await carRepository.getListCars();
    else {
      const filter = {};
      if (name) filter.name = name;
      if (type) filter.type = type;
      if (capacity) filter.capacity = capacity;
      if (rentPerDay) filter.rentPerDay = rentPerDay;
      if (availableAt) filter.availableAt = availableAt;

      cars = await carRepository.getFilteredListCars(filter);
    }

    if (cars.length == 0) throw new ApplicationError(`Data car is empty`, 404);

    return cars;
  } catch (error) {
    throw new ApplicationError(`Failed to get list cars: ${error.message}`, error.statusCode || 500);
  }
};

exports.createCar = async (payload, userId) => {
  try {
    const car = await carRepository.create(payload, userId);
    return car;
  } catch (error) {
    throw new ApplicationError(`Failed to get list cars: ${error.message}`, error.statusCode);
  }
};

exports.getCarById = async (id) => {
  try {
    const car = await carRepository.findByPk(id);
    if (!car) throw new ApplicationError(`Car not found`, 404);

    return car;
  } catch (error) {
    throw new ApplicationError(`Failed to get car by id: ${error.message}`, error.statusCode || 500);
  }
};

exports.updateCar = async (id, payload, userId) => {
  try {
    const [_, data] = await carRepository.update(id, payload, userId);
    return data;
  } catch (error) {
    throw new ApplicationError(`Failed to update car: ${error.message}`, 500);
  }
};

exports.deleteCar = async (id, userId) => {
  return Promise.all([carRepository.delete(id, userId), carRepository.update(id, { deletedBy: userId }, userId)]);
};
