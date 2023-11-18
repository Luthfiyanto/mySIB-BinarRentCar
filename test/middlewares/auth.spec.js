/* eslint-disable no-undef */
const AuthMiddleware = require("./../../app/middlewares/auth");
const authService = require("./../../app/services/auth");

jest.mock("./../../app/services/auth", () => ({ authorize: jest.fn(), isSuperAdmin: jest.fn(), isSuperOrAdmin: jest.fn() }));

describe("Authentication", () => {
  describe("#Authorize", () => {
    it("should return verified user by token", async () => {
      const mockRequest = {
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmMWU4ZWMyLWU0N2EtNDA1My1iODQ1LTg1YzhjYTg5NWFiMCIsImlhdCI6MTY5ODE1OTAxNX0.FeriAXCvWk14HBGRzCYI9FW3xr3NqIDZX28f-nsMmY8",
          user: null,
        },
      };
      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const next = jest.fn();

      const userData = {
        email: "testing@gmail.com",
        password: "testing",
        name: "User Test",
        address: "Lorem ipsum",
        phoneNumber: "087426",
      };
      authService.authorize.mockReturnValue(userData);
      await AuthMiddleware.authorize(mockRequest, mockResponse, next);

      expect(mockRequest.user).toEqual(userData);
      expect(next).toHaveBeenCalled();
    });
    it("should return error for authorization fails", async () => {
      const mockRequest = {
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdmMWU4ZWMyLWU0N2EtNDA1My1iODQ1LTg1YzhjYTg5NWFiMCIsImlhdCI6MTY5ODE1OTAxNX0.FeriAXCvWk14HBGRzCYI9FW3xr3NqIDZX28f-nsMmY8",
          user: null,
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      authService.authorize.mockReturnValue(Promise.reject({ statusCode: 500, message: "Unauthorized" }));
      await AuthMiddleware.authorize(mockRequest, mockResponse, next);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Fail",
        message: "Unauthorized",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("#IsSuperAdmin", () => {
    it("should call next middleware if user is SuperAdmin", () => {
      const mockRequest = {
        user: {
          email: "superadmin@gmail.com",
          name: "Super Admin",
          role: "SUPERADMIN",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      AuthMiddleware.isSuperAdmin(mockRequest, mockResponse, next);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it("should return error status and message for not allowed role", () => {
      const mockRequest = {
        user: {
          email: "testing@gmail.com",
          name: "testing",
          role: "MEMBER",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      AuthMiddleware.isSuperAdmin(mockRequest, mockResponse, next);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Fail",
        message: "FORBIDDEN",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("#IsSuperOrAdmin", () => {
    it("should call next middleware if user is SuperAdmin or Admin", () => {
      const mockRequest = {
        user: {
          email: "admin123@gmail.com",
          name: "Admin",
          role: "ADMIN",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      AuthMiddleware.isSuperOrAdmin(mockRequest, mockResponse, next);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it("should return error status and message for not allowed role", () => {
      const mockRequest = {
        user: {
          email: "testing@gmail.com",
          name: "testing",
          role: "MEMBER",
        },
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const next = jest.fn();

      AuthMiddleware.isSuperOrAdmin(mockRequest, mockResponse, next);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Fail",
        message: "FORBIDDEN",
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
