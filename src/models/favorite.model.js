const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const Favorite = sequelize.define(
  "favorite",

  {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    favorites: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Favorite",
  }
);

module.exports = { Favorite };
