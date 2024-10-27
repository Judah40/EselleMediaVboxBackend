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
  BUCKET_NAME,
  BUCKET_REGION,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
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
  awsBucketName: BUCKET_NAME,
  awsBucketRegion: BUCKET_REGION,
  awsAccessKey: ACCESS_KEY,
  awsSecretAccessKey: SECRET_ACCESS_KEY,
};
