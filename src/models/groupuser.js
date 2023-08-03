"use strict";
const { Model } = require("sequelize");
const { User, Group } = require("./index");
module.exports = (sequelize, DataTypes) => {
  class GroupUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // GroupUser.belongsTo(models.Group, { foreignKey: "GroupId" }); // Define the association with Group
      // GroupUser.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  GroupUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "GroupUser",
    }
  );
  return GroupUser;
};
