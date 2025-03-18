const Sequelize = require("sequelize")
const {sequelize} = require("../config/database")

const Subscription = sequelize.define("subscription", {
     userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        subscriptionType:{
            type: Sequelize.ARRAY(Sequelize.TEXT),
            allowNull: false,
        }
}, 
{
    sequelize, 
    modelName:"Subscription"
})

module.exports = {Subscription}