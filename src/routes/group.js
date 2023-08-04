const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/Auth");
const groupController = require("../controllers/group-controller");

router.post(
  "/group",
  authentication.Authenticate,
  groupController.create_group
);

router.get(
  "/get-groups",
  authentication.Authenticate,
  groupController.get_groups
);

router.post(
  "/group-add-user",
  authentication.Authenticate,
  groupController.add_user_group
);

router.patch(
  "/admin-update",
  authentication.Authenticate,
  groupController.adminUpdate
);

router.delete(
  "/delete-user",
  authentication.Authenticate,
  groupController.deleteUser
);

router.delete(
  "/delete-grp/:id",
  authentication.Authenticate,
  groupController.deleteGroup
);
module.exports = router;
