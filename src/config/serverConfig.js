const dotenv = require("dotenv");
const config = require("./config.json");
const bcrypt = require("bcrypt");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_KEY: process.env.JWT_KEY,
  SALT: bcrypt.genSaltSync(10),
  SYNC_DB: process.env.SYNC_DB,
};
