/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const CarsController = require("../../app/controllers/cars");
const carServices = require("./../../app/services/cars");

const cars = [
  {
    id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
    name: "Ford F150",
    type: "small",
    image: "./images/car01.min.jpg",
    capacity: 2,
    rentPerDay: 200000,
    description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    availableAt: "2023-03-23T15:49:05.563Z",
    createdAt: "2023-10-06T06:24:03.140Z",
    updatedAt: "2023-10-06T06:24:03.140Z",
  },
];

jest.mock("./../../app/services/cars", () => ({ getList: jest.fn(), getCarById: jest.fn(), createCar: jest.fn(), updateCar: jest.fn(), deleteCar: jest.fn() }));

describe("CarsController", () => {
  describe("#list", () => {
    it("should return list of cars", async () => {
      const mockRequest = {
        query: {
          type: "small",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.getList.mockReturnValue(cars);
      await CarsController.list(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    });
    it("should return error", async () => {
      const err = new Error("Something");

      const mockRequest = {
        query: {
          type: "small",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.getList.mockReturnValue(Promise.reject(err));
      await CarsController.list(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: err.message,
      });
    });
  });

  describe("#detail", () => {
    it("should return detail car by id", () => {
      const mockRequest = {
        params: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        car: cars,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      CarsController.detail(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: cars,
      });
    });
  });

  describe("#findAndSetbyId", () => {
    it("should check and add car into request body", async () => {
      const validId = "6e2bc663-5197-441a-957b-bc75e4a2da7c";
      const mockRequest = {
        params: { id: validId },
        car: null,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      carServices.getCarById.mockReturnValue(cars);
      await CarsController.findAndSetById(mockRequest, mockResponse, next);
      expect(mockRequest.car).toEqual(cars);
      expect(next).toHaveBeenCalled();
    });
    it("should return error: car not found", async () => {
      const invalidId = "6e2bc663-5197-441a-957b-bc75e4a2da7c";
      const mockRequest = {
        params: { id: invalidId },
        car: null,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();
      carServices.getCarById.mockRejectedValueOnce({ statusCode: 404, message: "Car not found" });
      await CarsController.findAndSetById(mockRequest, mockResponse, next);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Fail",
        message: "Car not found",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("#Create", () => {
    it("should return the created car data", async () => {
      const data = {
        name: "Random Car",
        type: "large",
        image: "./images/car02.min.jpg",
        capacity: 6,
        rentPerDay: 8000000,
        description: "Lorem ipsum",
        availableAt: "2023-03-23T15:49:05.563Z",
      };

      const mockRequest = {
        body: data,
        user: {
          id: "123IdUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.createCar.mockResolvedValue(data);
      await CarsController.create(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Created Success",
        data: {
          ...data,
        },
      });
    });

    it("should return error", async () => {
      const data = {
        name: "Random Car",
        type: "large",
        image: "./images/car02.min.jpg",
        capacity: 6,
        rentPerDay: 8000000,
        description: "Lorem ipsum",
        availableAt: "2023-03-23T15:49:05.563Z",
      };

      const mockRequest = {
        body: data,
        user: {
          id: "123IdUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.createCar.mockRejectedValue({ statusCode: 500, message: "Failed to create car" });
      await CarsController.create(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Failed to create car",
      });
    });
  });

  describe("#Update", () => {
    it("should update data and return updated cars", async () => {
      const updatedCar = {
        id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        name: "Ford F150",
        type: "small",
        image: "./images/car01.min.jpg",
        capacity: 2,
        rentPerDay: 200000,
        description: " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
        availableAt: "2023-03-23T15:49:05.563Z",
        createdAt: "2023-10-06T06:24:03.140Z",
        updatedAt: "2023-10-06T06:24:03.140Z",
      };

      const mockRequest = {
        params: {
          id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        },
        body: {
          capacity: 6,
        },
        user: {
          id: "123idUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.updateCar.mockResolvedValue(updatedCar);
      await CarsController.update(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: {
          ...updatedCar,
        },
      });
    });
    it("should return error", async () => {
      const mockRequest = {
        params: {
          id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        },
        body: {
          capacity: 6,
        },
        user: {
          id: "123idUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.updateCar.mockRejectedValueOnce({ statusCode: 500, message: "Failed to update" });
      await CarsController.update(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Failed to update",
      });
    });
  });

  describe("#Delete", () => {
    it("should return just status and message for delete successfully", async () => {
      const mockRequest = {
        params: {
          id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        },
        user: {
          id: "123idUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.deleteCar.mockReturnValue(Promise.all);
      await CarsController.destroy(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Deleted Successful",
      });
    });

    it("should return error message", async () => {
      const mockRequest = {
        params: {
          id: "6e2bc663-5197-441a-957b-bc75e4a2da7c",
        },
        user: {
          id: "123idUser",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      carServices.deleteCar.mockRejectedValueOnce({ statusCode: 500, message: "Server error" });
      await CarsController.destroy(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Failed to delete: Server error",
      });
    });
  });
});
