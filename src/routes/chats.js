const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/Auth");

const chat_controller = require("../controllers/chat-controller");

router.post(
  "/message",
  authentication.Authenticate,
  chat_controller.Create_Chat
);

//router.get("/chat", chat_controller.Get_user);

router.get("/chats/:grp_id", chat_controller.Get_Chat);

module.exports = router;
