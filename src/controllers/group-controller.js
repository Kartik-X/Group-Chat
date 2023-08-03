const GroupRepository = require("../repository/group-repository");
const grouprepository = new GroupRepository();

const create_group = async (req, res) => {
  try {
    const createGroup = await grouprepository.createGroup(req.body, req.user);
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

const add_user_group = async (req, res) => {
  try {
    const add_user = await grouprepository.addUser(req.body);
    return res.status(201).json({
      data: add_user,
      success: true,
      message: "successfully added the  user to the group",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Cannot add  user to the group",
      err: error,
    });
  }
};
const adminUpdate = async (req, res) => {
  try {
    const admin_update = await grouprepository.User_adminUpdate(req.body);
    return res.status(201).json({
      data: admin_update,
      success: true,
      message: "successfully added the  user to the group",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Cannot update the status of admin",
      err: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { GroupId, user_details } = req.query;

  try {
    const user_delete = await grouprepository.UserDelete(GroupId, user_details);
    return res.status(201).json({
      data: user_delete,
      success: true,
      message: "successfully added the  user to the group",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "unable to delete the user",
      err: error,
    });
  }
};

module.exports = {
  create_group,
  get_groups,
  add_user_group,
  adminUpdate,
  deleteUser,
};
