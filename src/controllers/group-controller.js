const GroupRepository = require("../repository/group-repository");
const grouprepository = new GroupRepository();

const create_group = async (req, res) => {
  try {
    const createGroup = await grouprepository.createGroup(
      req.body,
      req.user.id
    );
    return res.status(201).json({
      data: createGroup,
      success: true,
      message: "successfully created a group",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Cannot create a group",
      err: error,
    });
  }
};

const get_groups = async (req, res) => {
  try {
    const get_groups = await grouprepository.getGroups(req.user);
    return res.status(201).json({
      data: get_groups,
      success: true,
      message: "successfully fetched the groups",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Cannot fetch the groups",
      err: error,
    });
  }
};

module.exports = {
  create_group,
  get_groups,
};
