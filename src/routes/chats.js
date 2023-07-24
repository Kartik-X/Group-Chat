const express = require("express");
const router = express.Router();

const chat_controller = require("../controllers/chat-controller");

router.post("/message", chat_controller.Create_Chat);

//router.get("/message", chat_controller.get_user);

router.get("/chats", chat_controller.Get_Chat);

module.exports = router;
