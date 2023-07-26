const { Chat } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class ChatRepository {
  async createChat({ chats, userId }, username) {
    const userid = jwt.verify(userId, JWT_KEY).userId;

    try {
      const chat = await Chat.create({
        chats,
        username,
        userId: userid,
      });
      return chat;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }

  async get_user(startId) {
    try {
      const chat = await Chat.findAll({
        where: {
          id: {
            [Op.gt]: startId,
          },
        },
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
      return chats;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = ChatRepository;
