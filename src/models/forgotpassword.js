"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ForgotPassword extends Model {
    static associate(models) {
      ForgotPassword.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  ForgotPassword.init(
    {
      uuid: DataTypes.STRING,
      isActive: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ForgotPassword",
    }
  );
  return ForgotPassword;
};
