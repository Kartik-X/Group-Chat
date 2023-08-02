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

module.exports = router;
