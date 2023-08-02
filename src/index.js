const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT, SYNC_DB } = require("./config/serverConfig");
const signup_login = require("./routes/signup_login");
const chats = require("./routes/chats");
const group = require("./routes/group");
const db = require("./models/index");
const path = require("path");
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", signup_login);
app.use("/", chats);
app.use("/", group);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);

  if (SYNC_DB) {
    db.sequelize.sync({ alter: true });
  }
});
