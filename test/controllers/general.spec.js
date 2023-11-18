/* eslint-disable no-undef */
const { home, noPage } = require("./../../app/controllers/general");

describe("#Page", () => {
  describe("Home", () => {
    it("should return ping 200", () => {
      const mockRequest = null;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      home(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "OK",
        message: "ping successfully",
      });
    });
  });

  describe("NoPage", () => {
    it("should return 404 for unAvailable endpoint or Page", () => {
      const mockRequest = null;
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      noPage(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "404 Page Not Found",
      });
    });
  });
});
