const message = document.getElementById("msgs");
const send = document.getElementById("btn");
const chats = document.getElementById("chats");
const grp = document.getElementById("grp_btn");
const grp_container = document.getElementById("group-wrapper");
const CreateGrp_btn = document.getElementById("create_grp");
const Adduser_btn = document.getElementById("add_user");
const Adminstatus_btn = document.getElementById("admin_status");
const Removeuser_btn = document.getElementById("remove_user");
const grp_btn_user = document.getElementById("grp_btn_user");
const grp_btn_admin = document.getElementById("grp_btn_admin");
const grp_btn_remove = document.getElementById("grp_btn_remove");
let last_id = null;

CreateGrp_btn.addEventListener("click", () => {
  document.getElementById("groupDetails").classList.toggle("active");
});
grp.addEventListener("click", async (e) => {
  e.preventDefault();

  document.getElementById("groupDetails").classList.toggle("active");

  const grp_name = document.getElementById("grp_name").value;
  const obj = {
    name: grp_name,
  };
  // let li = document.createElement("li");
  // li.innerHTML = `<span id='chat_grp_name'>${grp_name}</span>`;
  // grp_container.append(li);
  // grp_name.value = "";

  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };
  const post_grp = await axios.post("http://localhost:4000/group", obj, config);
  window.location.reload();
});

Adduser_btn.addEventListener("click", () => {
  document.getElementById("groupDetails_adduser").classList.toggle("active");
});

grp_btn_user.addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("groupDetails_adduser").classList.toggle("active");
});

Adminstatus_btn.addEventListener("click", () => {
  document.getElementById("groupDetails_admin").classList.toggle("active");
});

grp_btn_admin.addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("groupDetails_admin").classList.toggle("active");
});

Removeuser_btn.addEventListener("click", () => {
  document.getElementById("groupDetails_remove").classList.toggle("active");
});

grp_btn_remove.addEventListener("click", async (e) => {
  e.preventDefault();
  document.getElementById("groupDetails_remove").classList.toggle("active");
});

async function getGroups() {
  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };
  const response = await axios.get("http://localhost:4000/get-groups", config);

  const group_data = response.data.data;
  console.log(group_data);

  for (let i = 0; i < group_data.length; i++) {
    const grp_li = document.createElement("li");
    grp_li.innerText = group_data[i].name;
    grp_container.appendChild(grp_li);

    grp_li.addEventListener("click", async () => {
      localStorage.setItem("group", group_data[i].id);
      window.location.reload();
    });
  }
}
getGroups();
async function get_chat() {
  const grp_id = localStorage.getItem("group");
  const getChat = await axios.get(`http://localhost:4000/chats/${grp_id}`);
  const msg_data = getChat.data.data;
  console.log(msg_data);
  last_id = msg_data[0].id;
  for (let i = msg_data.length - 1; i >= 0; i--) {
    const chat_name = msg_data[i].username;
    const chat_msg = msg_data[i].chats;
    const li = document.createElement("li");
    li.innerText = `${chat_name} : ${chat_msg}`;
    chats.appendChild(li);
  }
}
get_chat();

async function nextMessages() {
  const grp_id = localStorage.getItem("group");
  const getChat = await axios.get(`http://localhost:4000/chats/${grp_id}`);

  const chatdata = getChat.data.data;
  const filter = chatdata[0].id;

  if (filter > last_id) {
    let index = 0;
    while (chatdata[index].id != last_id) {
      const chatname = chatdata[index].username;
      const chat_msg = chatdata[index].chats;
      const li = document.createElement("li");
      li.innerText = `${chatname} : ${chat_msg}`;
      chats.appendChild(li);
      index++;
    }
    last_id = filter;
  }
}
// nextMessages();
// setInterval(() => {
//   nextMessages();
// }, 1000);

send.addEventListener("click", async (e) => {
  const obj = {
    chats: message.value,
    userId: localStorage.getItem("userId"),
    groupId: localStorage.getItem("group"),
  };

  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };

  const msg = await axios.post("http://localhost:4000/message", obj, config);

  message.value = "";
});
