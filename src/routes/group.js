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

router.post("/group-add-user", groupController.add_user_group);

router.patch("/admin-update", groupController.adminUpdate);

router.delete("/delete-user", groupController.deleteUser);

module.exports = router;
