const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT, SYNC_DB } = require("./config/serverConfig");
const signup_login = require("./routes/signup_login");
const db = require("./models/index");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", signup_login);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  if (SYNC_DB) {
    db.sequelize.sync({ alter: true });
  }
});
