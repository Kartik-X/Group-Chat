"use strict";
const { Model } = require("sequelize");
const { GroupUser } = require("./index");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.hasMany(models.Chat, { foreignKey: "groupId" });
      Group.belongsToMany(models.User, {
        through: models.GroupUser,
        foreignKey: "groupId",
      });
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Group",
    }
  );
  return Group;
};
