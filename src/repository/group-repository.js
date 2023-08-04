const { Group, User, GroupUser } = require("../models/index");

class GroupRepository {
  async createGroup({ name }, user) {
    try {
      const create_group = await Group.create({
        name,
      });

      return await create_group.addUser(user);
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }

  async getGroups(user) {
    try {
      const userGroups = await user.getGroups();
      return userGroups;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }

  async addUser({ GroupId, user_detail }, Logged_user) {
    try {
      const user = await User.findOne({
        where: {
          phone: user_detail,
        },
      });

      const group = await Group.findByPk(GroupId);

      const admin_check = await GroupUser.findOne({
        where: {
          GroupId: group.id,
          UserId: Logged_user.id,
        },
      });

      if (admin_check == null) {
        throw { error: "User not found" };
      } else if (admin_check.isAdmin == false) {
        throw { error: "Insufficient Privilages to add the user" };
      } else if (admin_check.isAdmin == true) {
        const userAdded = await group.addUser(user.id, {
          through: { isAdmin: false },
        });
        return userAdded;
      }
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }
  async User_adminUpdate({ GroupId, user_detail, admin_status }, Logged_user) {
    try {
      const group = await Group.findOne({
        where: {
          id: GroupId,
        },
      });
      const user = await User.findOne({
        where: {
          phone: user_detail,
        },
      });
      const admin_check = await GroupUser.findOne({
        where: {
          GroupId: group.id,
          UserId: Logged_user.id,
        },
      });
      if (admin_check == null) {
        throw { error: "User not found" };
      } else if (admin_check.isAdmin == false) {
        throw { error: "Insufficient Privilages to update user Status" };
      } else if (admin_check.isAdmin == true) {
        const update_status = await GroupUser.update(
          { isAdmin: admin_status },
          {
            where: {
              GroupId: group.id,
              UserId: user.id,
            },
          }
        );
        return update_status;
      }
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }

  async UserDelete(GroupId, user_detail, Logged_user) {
    try {
      const group = await Group.findOne({
        where: {
          id: GroupId,
        },
      });
      const user = await User.findOne({
        where: {
          phone: user_detail,
        },
      });
      const admin_check = await GroupUser.findOne({
        where: {
          GroupId: group.id,
          UserId: Logged_user.id,
        },
      });
      if (admin_check == null) {
        throw { error: "User not found" };
      } else if (admin_check.isAdmin == false) {
        throw { error: "Insufficient Privilages to delete user" };
      }
      if (admin_check.isAdmin == true) {
        const deleteUser = await GroupUser.destroy({
          where: {
            GroupId: group.id,
            UserId: user.id,
          },
        });
        return true;
      }
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }
  async delete_Grp(groupId, userId) {
    try {
      const admin_check = await GroupUser.findOne({
        where: {
          GroupId: groupId,
          UserId: userId,
        },
      });
      if (admin_check == null) {
        throw { error: "User not found" };
      } else if (admin_check.isAdmin == false) {
        throw { error: "Insufficient Privilages to delete group" };
      }
      if (admin_check.isAdmin == true) {
        const deleteGrp = await Group.destroy({
          where: {
            id: groupId,
          },
        });
        return true;
      }
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw error;
    }
  }
}

module.exports = GroupRepository;
