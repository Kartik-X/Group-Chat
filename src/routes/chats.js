const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const authentication = require("../middlewares/Auth");
const chat_controller = require("../controllers/chat-controller");

router.post(
  "/message",
  authentication.Authenticate,
  chat_controller.Create_Chat
);

//router.get("/chat", chat_controller.Get_user);

router.get("/chats/:grp_id", chat_controller.Get_Chat);

router.post(
  "/multimedia-share",
  authentication.Authenticate,
  upload.single("file"),
  chat_controller.Multimedia_Chat
);

module.exports = router;
