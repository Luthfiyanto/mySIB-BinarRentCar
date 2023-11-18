const express = require("express");
const cors = require("cors");
const generalController = require("./app/controllers/general");
const carController = require("./app/controllers/cars");
const userController = require("./app/controllers/user");
const authMiddleware = require("./app/middlewares/auth");
const { validationInputCar } = require("./app/middlewares/validation");

const app = express();
const PORT = 8000;

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");

app.use(cors());

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home
app.get("/", generalController.home);

// User
app.post("/user/admin/register", authMiddleware.authorize, authMiddleware.isSuperAdmin, userController.registerAdmin);
app.post("/user/register", userController.register);
app.post("/user/login", userController.login);
app.get("/user/me", authMiddleware.authorize, userController.currentUser);

// Cars
app.get("/cars", authMiddleware.authorize, carController.list);
app.get("/cars/:id", authMiddleware.authorize, carController.findAndSetById, carController.detail);
app.post("/cars", authMiddleware.authorize, authMiddleware.isSuperOrAdmin, validationInputCar, carController.create);
app.put("/cars/:id", authMiddleware.authorize, authMiddleware.isSuperOrAdmin, carController.findAndSetById, validationInputCar, carController.update);
app.delete("/cars/:id", authMiddleware.authorize, authMiddleware.isSuperOrAdmin, carController.findAndSetById, carController.destroy);

// No page
app.get("*", generalController.noPage);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${PORT}`);
});
