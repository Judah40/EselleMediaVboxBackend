const Sequelize = require("sequelize");
require("dotenv").config;

const {
  dbName,
  dbUsername,
  dbPassword,
  dbPort,
  dbUrl,
  appPort,
} = require("./default.config");

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: "vboxesselle",
//   user: "postgres",
//   password: "RosieDore123@",
//   host: "localhost",
//   port: 5432,
//   clientMinMessages: "notice",
// });

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  dialect: "postgres",
  host: dbUrl,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
});
//CONNECT TO DB
const connectDB = async (app) => {
  console.log(dbName, dbUsername, dbPassword, dbPort, dbUrl, appPort);
  try {
    if (app) {
      await sequelize.sync({ alter: true });
      console.log("Database connected successfully");
      app.listen(appPort, () => {
        console.log(`🚀 Server Listening on port ${appPort}`);
      });
    }
  } catch (error) {
    console.error("❌ Postgres connection error:", error);
  }
};
module.exports = { connectDB, sequelize };
