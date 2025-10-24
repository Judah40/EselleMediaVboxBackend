const Sequelize = require("sequelize");
const { sequelize } = require("../config/database");

const MyList = sequelize.define(
  "mylist",
  {
    listId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
    },
    posts: {
      type: Sequelize.UUID,
      references: {
        model: "posts",
        key: "postId",
      },
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "mylist",
  }
);

module.exports = { MyList };
