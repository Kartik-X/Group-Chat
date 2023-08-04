const GroupRepository = require("../repository/group-repository");
const grouprepository = new GroupRepository();

const create_group = async (req, res) => {
  try {
    const createGroup = await grouprepository.createGroup(req.body, req.user);
    return res.status(201).json({
      data: createGroup,
      success: true,
      message: "Successfully created a group",
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
      message: "Successfully fetched the groups",
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
    const add_user = await grouprepository.addUser(req.body, req.user);
    return res.status(201).json({
      data: add_user,
      success: true,
      message: "Successfully added the  User to the group",
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
    const admin_update = await grouprepository.User_adminUpdate(
      req.body,
      req.user
    );
    return res.status(201).json({
      data: admin_update,
      success: true,
      message: "Successfully updated the status to Admin",
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
    const user_delete = await grouprepository.UserDelete(
      GroupId,
      user_details,
      req.user
    );
    return res.status(201).json({
      data: user_delete,
      success: true,
      message: "Successfully removed the user from group",
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
const deleteGroup = async (req, res) => {
  console.log(req.params.id, req.user.id);
  try {
    const del_grp = await grouprepository.delete_Grp(
      req.params.id,
      req.user.id
    );
    return res.status(201).json({
      data: del_grp,
      success: true,
      message: "Successfully deleted the group",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Unable to delete the group",
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
  deleteGroup,
};
