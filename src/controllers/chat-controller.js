const ChatRepository = require("../repository/chats-repository");
const ChatService = require("../services/chats-service");
const chatservice = new ChatService();
const chatrepository = new ChatRepository();

const Create_Chat = async (req, res) => {
  try {
    const chat = await chatrepository.createChat(req.body, req.user.username);

    return res.status(201).json({
      data: chat,
      success: true,
      message: "Successfully created a chat",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a chat",
      err: error,
    });
  }
};
const Get_Chat = async (req, res) => {
  console.log(req.params.grp_id);
  try {
    const get_chats = await chatrepository.getChats(req.params.grp_id);

    return res.status(201).json({
      data: get_chats,
      success: true,
      message: "Successfully fetched the chats",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "unable to get the chats",
      err: error,
    });
  }
};

const Get_user = async (req, res) => {
  try {
    const get_chats = await chatrepository.get_user();

    return res.status(201).json({
      data: get_chats,
      success: true,
      message: "Successfully fetched the chats",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "unable to get the chats",
      err: error,
    });
  }
};

const Multimedia_Chat = async (req, res) => {
  try {
    const get_chats = await chatservice.multimedia_chat(
      req.file,
      req.user.id,
      req.body.groupId,
      req.user.username
    );

    return res.status(201).json({
      data: get_chats,
      success: true,
      message: "Successfully sent multimedia chats",
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "unable to send multimedia chats",
      err: error,
    });
  }
};

module.exports = {
  Create_Chat,
  Get_Chat,
  Get_user,
  Multimedia_Chat,
};
