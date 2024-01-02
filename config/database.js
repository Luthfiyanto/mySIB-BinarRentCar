const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
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
