const { Chat } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

class ChatRepository {
  async createChat({ chats, userId }) {
    const userid = jwt.verify(userId, JWT_KEY).userId;
    try {
      const chat = await Chat.create({
        chats,
        userId: userid,
      });
      return chat;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }

  async getChats() {
    try {
      const chats = await Chat.findAll();

      if (chats.length == 0) {
        throw { error: "Chat room is empty" };
      }
      return chats;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = ChatRepository;
