const Sequelize = require("sequelize");
require("dotenv").config(); // Fixed: added parentheses

const {
  dbName,
  dbUsername,
  dbPassword,
  dbPort,
  dbUrl,
  appPort,
  connectionString,
  databaseUrl,
} = require("./default.config");

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 60000,
    // Force IPv4
    family: 4,
  },
  ssl: true,

  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
// const sequelize = new Sequelize({
//   dialect: "postgres",
//   database: "esselleMedia", // or use dbName from config
//   username: "esselleMedia", // Fixed: changed 'user' to 'username'
//   password: "RosieDore123", // Make sure this matches your Docker env (without @)
//   host: "localhost",
//   port: 5434, // Changed to match your new Docker port mapping
//   logging: console.log, // Enable to see SQL queries
// });

// Alternative: Using your config variables
// const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
//   dialect: "postgres",
//   host: dbUrl || "localhost",
//   port: dbPort || 5434,
// });

// CONNECT TO DB
const connectDB = async (app) => {
  // console.log("Config values:", {
  //   dbName,
  //   dbUsername,
  //   dbPassword,
  //   dbPort,
  //   dbUrl,
  //   appPort,
  // });

  try {
    // First, test authentication
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");

    if (app) {
      // Then sync models
      await sequelize.sync({ alter: true });
      console.log("✅ Models synchronized successfully");

      // Start server
      app.listen(appPort, () => {
        console.log(`🚀 Server Listening on port ${appPort}`);
      });
    }
  } catch (error) {
    console.error("❌ Postgres connection error:", error.message);
  }
};

module.exports = { connectDB, sequelize };
