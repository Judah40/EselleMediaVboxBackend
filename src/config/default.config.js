require("dotenv").config;

const {
  DB_HOST,
  DB_NAME,
  APP_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  APP_URL,
  JWT_SECRET,
} = process.env;

module.exports = {
  appPort: APP_PORT,
  appUrl: APP_URL,
  jwtSecret: JWT_SECRET,
  dbUrl: DB_HOST,
  dbName: DB_NAME,
  dbPort: DB_PORT,
  dbUsername: DB_USERNAME,
  dbPassword: DB_PASSWORD,
};
