"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Chat.init(
    {
      chats: DataTypes.STRING,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
