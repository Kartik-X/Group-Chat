module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("GroupUser", "isAdmin", {
      type: Sequelize.BOOLEAN,
      defaultValue: true, // Set the default value for isAdmin
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("GroupUser", "isAdmin");
  },
};
