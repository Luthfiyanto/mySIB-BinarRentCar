/* eslint-disable no-undef */
const UserController = require("./../../app/controllers/user");
const userService = require("./../../app/services/user");

jest.mock("./../../app/services/user", () => ({ create: jest.fn(), checkUser: jest.fn() }));

describe("UserController", () => {
  describe("#Register", () => {
    it("should return registered User", async () => {
      const userData = {
        email: "testing@gmail.com",
        password: "testing",
        name: "User Test",
        address: "Lorem ipsum",
        phoneNumber: "087426",
      };

      const mockRequest = {
        body: userData,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userService.create.mockReturnValue(userData);
      await UserController.register(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: userData,
      });
    });

    it("should return error", async () => {
      const userData = {
        email: "testing@gmail.com",
        password: "testing",
        name: "User Test",
        address: "Lorem ipsum",
        phoneNumber: "087426",
      };

      const mockRequest = {
        body: userData,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new Error("Failed to register", 500);
      userService.create.mockReturnValue(Promise.reject(err));
      await UserController.register(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: err.message,
      });
    });
  });

  describe("#Login", () => {
    it("should return data user within token", async () => {
      const mockRequest = {
        email: "test@gmail.com",
        password: "testing",
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const verifiedUser = {
        email: "testing@gmail.com",
        password: "encryptedpassword",
        name: "User Test",
        address: "Lorem ipsum",
        phoneNumber: "087426",
        token: "thisistoken",
      };
      userService.checkUser.mockReturnValue(verifiedUser);
      await UserController.login(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Login Successful",
        data: verifiedUser,
      });
    });

    it("should return login failed condition", async () => {
      const mockRequest = {
        email: "test@gmail.com",
        password: "testing",
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new Error("Email or Password invalid", 500);
      userService.checkUser.mockReturnValue(Promise.reject(err));
      await UserController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: `Login Failed: ${err.message}`,
      });
    });
  });

  describe("#RegisterAdmin", () => {
    it("should return registered user as admin", async () => {
      const userData = {
        email: "admin@gmail.com",
        password: "admin123",
        name: "Admin Test",
        address: "Lorem ipsum",
        phoneNumber: "087123",
      };
      const mockRequest = {
        body: userData,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      userService.create.mockReturnValue(userData);
      await UserController.registerAdmin(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: userData,
      });
    });
    it("should return failed to add admin", async () => {
      const userData = {
        email: "admin@gmail.com",
        password: "admin123",
        name: "Admin Test",
        address: "Lorem ipsum",
        phoneNumber: "087123",
      };
      const mockRequest = {
        body: userData,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new Error("Failed to add new user", 500);
      userService.create.mockReturnValue(Promise.reject(err));
      await UserController.registerAdmin(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: err.message,
      });
    });
  });

  describe("#CurrentUser", () => {
    it("should return current user data", () => {
      const storedDataUser = {
        email: "testing@gmail.com",
        password: "testing",
        name: "User Test",
        address: "Lorem ipsum",
        phoneNumber: "087426",
      };
      const mockRequest = {
        user: storedDataUser,
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      UserController.currentUser(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "Success",
        data: storedDataUser,
      });
    });
  });
});
