const ChatRepository = require("../repository/chats-repository");
const chatrepository = new ChatRepository();
const {
  Bucket_Name,
  I_Am_UserKey,
  I_Am_userSecret,
} = require("../config/serverConfig");
const AWS = require("aws-sdk");

class ChatService {
  #uploadFileToS3(file, filename, mimeType = "application/octet-stream") {
    const BUCKET_NAME = Bucket_Name;
    const IAM_USER_KEY = I_Am_UserKey;
    const IAM_USER_SECRET = I_Am_userSecret;

    const s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: file,
      ContentType: mimeType,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, response) => {
        if (err) {
          console.log("Something went wrong during file uploading");
          reject(err);
        } else {
          console.log("Success", response);
          resolve(response.Location);
        }
      });
    });
  }
  async multimedia_chat(file, userId, groupId, username) {
    try {
      const fileMimetype = file.mimetype;
      const filename = `Chat${userId}/${new Date()}.txt`;
      const fileUrl = await this.#uploadFileToS3(
        file.buffer,
        filename,
        fileMimetype
      );
      const sentFile = await await chatrepository.UploadedFile(
        fileUrl,
        userId,
        groupId,
        username
      );
      return true;
    } catch (error) {
      console.log("Something went wrong in sending multimedia chats");
      throw { error };
    }
  }
}

module.exports = ChatService;
