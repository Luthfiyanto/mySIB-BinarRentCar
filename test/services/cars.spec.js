/* eslint-disable no-undef */
const carServices = require("./../../app/services/cars");
const carRepository = require("./../../app/repositories/cars");
const ApplicationError = require("../../config/errors/ApplicationError");

jest.mock("./../../app/repositories/cars", () => ({ getListCars: jest.fn(), getFilteredListCars: jest.fn(), create: jest.fn(), findByPk: jest.fn(), update: jest.fn(), delete: jest.fn() }));

describe("CarServices", () => {
  describe("GetList", () => {
    it("should return list of cars", async () => {
      const dataCars = [
        {
          name: "Random Car",
          type: "large",
          capacity: 6,
          rentPerDay: 7000000,
          availableAt: "2023-03-23T15:49:05.563Z",
        },
      ];

      const mockParams = {
        capacity: 6,
      };

      carRepository.getFilteredListCars.mockReturnValue([dataCars]);
      const data = await carServices.getList(mockParams);

      expect(data).toEqual([dataCars]);
    });

    it("should return error 404: empty message", async () => {
      const mockParams = {
        capacity: 6,
      };

      carRepository.getFilteredListCars.mockReturnValue([]);

      await expect(async () => {
        await carServices.getList(mockParams);
      }).rejects.toThrow(new ApplicationError("Failed to get list cars: Data car is empty", 404));
    });

    it("should return error 404: empty message", async () => {
      const mockParams = {
        capacity: 6,
      };

      const err = new ApplicationError("Server error", 500);
      carRepository.getFilteredListCars.mockReturnValue(Promise.reject(err));

      await expect(async () => {
        await carServices.getList(mockParams);
      }).rejects.toThrow(new ApplicationError("Failed to get list cars: Server error", 404));
    });
  });

  describe("CreateCar", () => {
    it("should return created car", async () => {
      const dataCar = {
        name: "Random Car",
        type: "large",
        capacity: 6,
        rentPerDay: 7000000,
        availableAt: "2023-03-23T15:49:05.563Z",
      };

      const mockPayload = dataCar;
      const userId = "1254327userid2452";

      carRepository.create.mockReturnValue(dataCar);
      const result = await carServices.createCar(mockPayload, userId);

      expect(result).toEqual(dataCar);
    });

    it("should throw error for create fails", async () => {
      const dataCar = {
        name: "Random Car",
        type: "large",
        capacity: 6,
        rentPerDay: 7000000,
        availableAt: "2023-03-23T15:49:05.563Z",
      };

      const mockPayload = dataCar;
      const userId = "1254327userid2452";

      const err = new ApplicationError("Server error", 500);
      carRepository.create.mockReturnValue(Promise.reject(err));
      await expect(async () => {
        await carServices.createCar(mockPayload, userId);
      }).rejects.toThrow(new ApplicationError("Failed to get list cars: Server error", 500));
    });
  });

  describe("GetCarById", () => {
    it("should return car based on id", async () => {
      const mockId = "53613521r3516";

      const dataCar = {
        id: "53613521r3516",
        name: "Random Car",
        type: "large",
        capacity: 6,
        rentPerDay: 7000000,
        availableAt: "2023-03-23T15:49:05.563Z",
      };
      carRepository.findByPk.mockReturnValue(dataCar);
      const result = await carServices.getCarById(mockId);

      expect(result).toEqual(dataCar);
    });

    it("should throw error", async () => {
      const mockId = "53613521r3516";
      const err = new ApplicationError("Something error", 500);
      carRepository.findByPk.mockReturnValue(Promise.reject(err));
      await expect(async () => {
        await carServices.getCarById(mockId);
      }).rejects.toThrow(new ApplicationError("Failed to get car by id: Something error", 500));
    });
  });

  describe("UpdateCar", () => {
    it("should return updated car", async () => {
      const mockId = "53613521r3516";
      const mockPayload = {
        name: "Random Car",
        type: "large",
        capacity: 6,
        rentPerDay: 7000000,
      };
      const mockUserId = "2e51w56te217t5e2617";
      const mockReturn = {
        id: "53613521r3516",
        ...mockPayload,
      };
      const index = 0;

      carRepository.update.mockReturnValue([index, mockReturn]);
      const result = await carServices.updateCar(mockId, mockPayload, mockUserId);

      expect(result).toEqual(mockReturn);
    });

    it("should throw error", async () => {
      const mockId = "53613521r3516";
      const mockPayload = {
        name: "Random Car",
        type: "large",
        capacity: 6,
        rentPerDay: 7000000,
      };
      const mockUserId = "2e51w56te217t5e2617";
      const err = new ApplicationError("Something error", 500);

      carRepository.update.mockReturnValue(Promise.reject(err));

      await expect(async () => {
        await carServices.updateCar(mockId, mockPayload, mockUserId);
      }).rejects.toThrow(new ApplicationError("Failed to update car: Something error", 500));
    });
  });

  describe("DeleteCar", () => {
    it("should return Promise", async () => {
      const mockId = "53613521r3516";
      const mockUserId = "2e51w56te217t5e2617";

      carRepository.delete.mockReturnValue("Delete Result");
      carRepository.update.mockReturnValue("Update Result");

      const result = await carServices.deleteCar(mockId, mockUserId);

      expect(result).toEqual(["Delete Result", "Update Result"]);
      expect(carRepository.delete).toHaveBeenCalledWith(mockId, mockUserId);
      expect(carRepository.update).toHaveBeenCalledWith(mockId, { deletedBy: mockUserId }, mockUserId);
    });

    it("should return Promise", async () => {
      const mockId = "53613521r3516";
      const mockUserId = "2e51w56te217t5e2617";

      const err = new Error("Something error");
      carRepository.delete.mockRejectedValueOnce(err);
      carRepository.update.mockResolvedValue("Update Result");

      await expect(async () => {
        await carServices.deleteCar(mockId, mockUserId);
      }).rejects.toThrow(new ApplicationError("Something error", 500));
    });
  });
});
