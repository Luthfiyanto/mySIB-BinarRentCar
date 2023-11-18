/* eslint-disable no-undef */
const userServices = require("./../../app/services/user");
const userRepository = require("./../../app/repositories/user");
const authService = require("./../../app/services/auth");
const ApplicationError = require("../../config/errors/ApplicationError");

jest.mock("./../../app/repositories/user", () => ({ create: jest.fn(), findUserByEmail: jest.fn(), findByPk: jest.fn() }));
jest.mock("./../../app/services/auth", () => ({ encryptedPassword: jest.fn(), checkPassword: jest.fn(), createToken: jest.fn() }));

describe("UserServices", () => {
  describe("#Create", () => {
    it("should return data user with encrypted password", async () => {
      const mockPayload = {
        email: "testing@gmail.com",
        password: "testing",
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
      };

      const mockResult = {
        email: "testing@gmail.com",
        encryptedPassword: "gduadbhabdhbshabhfhaubdha",
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
        role: "ADMIN",
      };

      authService.encryptedPassword.mockReturnValue("gduadbhabdhbshabhfhaubdha");
      userRepository.create.mockReturnValue(mockResult);
      const mockReturn = await userServices.create(mockPayload, true);

      expect(mockReturn).toEqual({ ...mockResult });
    });

    it("should throw error to fill email or password", async () => {
      const mockPayload = {
        email: null,
        password: null,
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
      };

      await expect(async () => {
        await userServices.create(mockPayload, false);
      }).rejects.toThrow(new ApplicationError("Failed to add new user Please input email and password", 400));
    });

    it("should throw error for create fails", async () => {
      const mockPayload = {
        email: "testing@gmail.com",
        password: "testing",
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
      };

      const err = new ApplicationError("Server error", 500);
      authService.encryptedPassword.mockReturnValue("gduadbhabdhbshabhfhaubdha");
      userRepository.create.mockReturnValue(Promise.reject(err));

      await expect(async () => {
        await userServices.create(mockPayload, false);
      }).rejects.toThrow(new ApplicationError("Failed to add new user Server error", 500));
    });
  });

  describe("#CheckUser", () => {
    it("should return user data with token", async () => {
      const mockCredential = {
        email: "testing@gmail.com",
        password: "testing",
      };

      const mockResult = {
        email: "testing@gmail.com",
        encryptedPassword: "gduadbhabdhbshabhfhaubdha",
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
        role: "MEMBER",
      };
      const token = "abduabubdshbfcadnjna";

      userRepository.findUserByEmail.mockReturnValue(mockResult);
      authService.checkPassword.mockReturnValue(true);
      authService.createToken.mockReturnValue(token);

      const result = await userServices.checkUser(mockCredential);

      expect(result).toEqual({ ...mockResult.dataValues, token });
    });

    it("should return error for bad request", async () => {
      const mockCredential = {
        email: null,
        password: "testing",
      };

      await expect(async () => {
        await userServices.checkUser(mockCredential);
      }).rejects.toThrow(new ApplicationError("Please input email and password", 400));
    });

    it("should return error for invalid password", async () => {
      const mockCredential = {
        email: "testing@gmail.com",
        password: "testing",
      };

      const mockResult = {
        email: "testing@gmail.com",
        encryptedPassword: "gduadbhabdhbshabhfhaubdha",
        name: "Testing",
        address: "Lorem ipsum",
        phoneNumber: "08624",
        role: "MEMBER",
      };

      const err = new ApplicationError("Password is invalid", 401);
      userRepository.findUserByEmail.mockReturnValue(mockResult);
      authService.checkPassword.mockReturnValue(false);

      await expect(async () => {
        await userServices.checkUser(mockCredential);
      }).rejects.toThrow(err);
    });

    it("should return error for case caused by server error", async () => {
      const mockCredential = {
        email: "testing@gmail.com",
        password: "testing",
      };

      const err = new ApplicationError("Email is invalid", 500);
      userRepository.findUserByEmail.mockReturnValue(Promise.reject(err));
      authService.checkPassword.mockReturnValue(true);

      await expect(async () => {
        await userServices.checkUser(mockCredential);
      }).rejects.toThrow(new ApplicationError("Email is invalid", 500));
    });
  });
});
