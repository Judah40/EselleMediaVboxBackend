const Sequelize = require("sequelize");
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

const sequelize = new Sequelize("vboxesselle", "postgres", "RosieDore123@", {
    dialect: "postgres",
    host: "localhost",
  });
//CONNECT TO DB
const connectDB = async (app) => {
  try {
    if (app) {
      await sequelize.sync();
      console.log("Database connected successfully");
      app.listen(4000, () => {
        console.log(`🚀 Server Listening on http://3000`);
      });
    }
  } catch (error) {
    console.error("❌ Postgres connection error:", error.message);
  }
};
module.exports = {connectDB, sequelize};
