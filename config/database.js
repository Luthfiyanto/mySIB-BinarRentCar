const { DB_USERNAME = "postgres", DB_PASSWORD = "54321", DB_HOST = "127.0.0.1", DB_NAME = "db_binar_car_rental_dev" } = process.env;

module.exports = {
  development: {
    username: "postgres",
    password: "DE*e3Fc4ce-eGcG51CedbBE1FD-cAEFF",
    database: "railway",
    host: "viaduct.proxy.rlwy.net",
    port: "23930",
    dialect: "postgres",
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "postgres",
  },
  production: {
    username: "postgres",
    password: "DE*e3Fc4ce-eGcG51CedbBE1FD-cAEFF",
    database: "railway",
    host: "viaduct.proxy.rlwy.net",
    port: "23930",
    dialect: "postgres",
  },
};
