const dotenv = require("dotenv");
const config = require("./config.json");
const Sib = require("sib-api-v3-sdk");
const bcrypt = require("bcrypt");

dotenv.config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

config.development.username = process.env.DB_USERNAME;
config.development.password = process.env.DB_PASSWORD;

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_KEY: process.env.JWT_KEY,
  SALT: bcrypt.genSaltSync(10),
  SYNC_DB: process.env.SYNC_DB,
};
