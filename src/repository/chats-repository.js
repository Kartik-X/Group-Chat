const { Chat } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class ChatRepository {
  async createChat({ chats, userId, groupId }, username) {
    const userid = jwt.verify(userId, JWT_KEY).userId;

    try {
      const chat = await Chat.create({
        chats,
        username,
        userId: userid,
        groupId,
      });
      return chat;
    } catch (error) {
      console.log("Something went wrong in repository layer");
      throw { error };
    }
  }

  // async get_user() {
  //   try {
  //     const chat = await Chat.findAll({
  //       order: [["createdAt", "DESC"]],
  //       limit: 10,
  //     });
  //     console.log(chat);
  //     return chat;
  //   } catch (error) {
  //     console.log("Something went wrong in repository layer");
  //     throw { error };
  //   }
  // }

  async getChats(group_id) {
    try {
      const chat = await Chat.findAll({
        where: {
          groupId: group_id,
        },
        order: [["createdAt", "DESC"]],
        limit: 10,
      });

      return chat;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }

  async UploadedFile(chats, userId, groupId, username) {
    console.log(chats, userId, groupId, username);
    try {
      const chat = await Chat.create({
        chats,
        username,
        userId,
        groupId,
      });
      return chat;
    } catch (error) {
      console.log("something went wrong in repository layer");
      throw { error };
    }
  }
}
module.exports = ChatRepository;
