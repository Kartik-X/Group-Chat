const { Group } = require("../models/index");

class GroupRepository {
  async createGroup({ name }, user) {
    try {
      const create_group = await Group.create({
        name,
      });

      await create_group.addUser(user, { through: { isAdmin: true } });
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
}

module.exports = GroupRepository;
