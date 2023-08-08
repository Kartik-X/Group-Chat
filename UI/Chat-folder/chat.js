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
const grp_del = document.getElementById("delete_grp");
const grp_btn_del = document.getElementById("grp_btn_del");
let ul_remove = document.getElementById("ul_remove");
let ul_admin = document.getElementById("ul_admin");
let ul_adduser = document.getElementById("ul_adduser");
let ul_creategrp = document.getElementById("ul_creategrp");
let ul_deluser = document.getElementById("ul_deluser");
const share = document.getElementById("uploadForm");
let last_id = null;

const socket = io("http://localhost:4000");

CreateGrp_btn.addEventListener("click", () => {
  document.getElementById("groupDetails").classList.toggle("active");
});
grp.addEventListener("click", async (e) => {
  e.preventDefault();

  const grp_name = document.getElementById("grp_name").value;
  const obj = {
    name: grp_name,
  };
  try {
    const token = localStorage.getItem("userId");
    const config = { headers: { Authorization: token } };
    const post_grp = await axios.post(
      "http://localhost:4000/group",
      obj,
      config
    );
    window.location.reload();
  } catch (error) {
    ul_creategrp.innerHTML = "";
    const err_obj = error.response.data.err.error;
    const li = document.createElement("li");
    li.innerHTML = `<span>${err_obj}</span>`;
    ul_creategrp.appendChild(li);
  }
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

  const grp_detail = document.getElementById("grpname").value;
  const user_detail = document.getElementById("grpuser").value;

  const obj = {
    GroupId: grp_detail,
    user_detail: user_detail,
  };
  try {
    const token = localStorage.getItem("userId");
    const config = { headers: { Authorization: token } };

    const Add_User = await axios.post(
      "http://localhost:4000/group-add-user",
      obj,
      config
    );
    const msg_detail = Add_User.data;
    const msg = msg_detail.message;
    const li = document.createElement("li");
    li.innerHTML = `<span>${msg}</span>`;
    ul_adduser.appendChild(li);
  } catch (error) {
    ul_adduser.innerHTML = "";
    const err_obj = error.response.data.err.error;
    const li = document.createElement("li");
    li.innerHTML = `<span>${err_obj}</span>`;
    ul_adduser.appendChild(li);
  }
});

Adminstatus_btn.addEventListener("click", () => {
  document.getElementById("groupDetails_admin").classList.toggle("active");
});

grp_btn_admin.addEventListener("click", async (e) => {
  e.preventDefault();
  ul_admin.innerHTML = "";

  const admin_grp = document.getElementById("admin_grpname").value;
  const admin_user = document.getElementById("admin_grpuser").value;
  const admin_status = document.getElementById("user_adminstatus").value;

  const obj = {
    GroupId: admin_grp,
    user_detail: admin_user,
    admin_status: admin_status,
  };
  try {
    const token = localStorage.getItem("userId");
    const config = { headers: { Authorization: token } };

    const user_adminStatus = await axios.patch(
      "http://localhost:4000/admin-update",
      obj,
      config
    );
    const msg_detail = user_adminStatus.data;
    const msg = msg_detail.message;
    const li = document.createElement("li");
    li.innerHTML = `<span>${msg}</span>`;
    ul_admin.appendChild(li);
  } catch (error) {
    ul_admin.innerHTML = "";
    const err_obj = error.response.data.err.error;
    const li = document.createElement("li");
    li.innerHTML = `<span>${err_obj}</span>`;
    ul_admin.appendChild(li);
  }
});

Removeuser_btn.addEventListener("click", () => {
  document.getElementById("groupDetails_remove").classList.toggle("active");
});

grp_btn_remove.addEventListener("click", async (e) => {
  e.preventDefault();
  ul_remove.innerHTML = "";
  let remove_grp = document.getElementById("remove_grpname").value;
  let remove_user = document.getElementById("remove_grpuser").value;

  try {
    const token = localStorage.getItem("userId");
    const config = { headers: { Authorization: token } };
    const user_delete = await axios.delete(
      `http://localhost:4000/delete-user?GroupId=${remove_grp}&user_details=${remove_user}`,
      config
    );

    const msg_detail = user_delete.data;
    const msg = msg_detail.message;
    const li = document.createElement("li");
    li.innerHTML = `<span>${msg}</span>`;
    ul_remove.appendChild(li);
  } catch (error) {
    ul_remove.innerHTML = "";
    const err_obj = error.response.data.err.error;
    const li = document.createElement("li");
    li.innerHTML = `<span>${err_obj}</span>`;
    ul_remove.appendChild(li);
  }
});

grp_del.addEventListener("click", () => {
  document.getElementById("groupDetails_del_user").classList.toggle("active");
});

grp_btn_del.addEventListener("click", async (e) => {
  e.preventDefault();
  ul_deluser.innerHTML = "";
  const del_grpname = document.getElementById("del_grpname").value;
  try {
    const token = localStorage.getItem("userId");
    const config = { headers: { Authorization: token } };
    const grp_delete = await axios.delete(
      `http://localhost:4000/delete-grp/${del_grpname}`,
      config
    );
    const msg_detail = grp_delete.data;
    const msg = msg_detail.message;
    const li = document.createElement("li");
    li.innerHTML = `<span>${msg}</span>`;
    ul_deluser.appendChild(li);
  } catch (error) {
    ul_deluser.innerHTML = "";
    const err_obj = error.response.data.err.error;
    const li = document.createElement("li");
    li.innerHTML = `<span>${err_obj}</span>`;
    ul_deluser.appendChild(li);
  }
});

async function getGroups() {
  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };
  const response = await axios.get("http://localhost:4000/get-groups", config);

  const group_data = response.data.data;

  for (let i = 0; i < group_data.length; i++) {
    const grp_li = document.createElement("li");
    grp_li.innerHTML = `<span id="user_grp">${group_data[i].name}</span>`;

    if (localStorage.getItem("group") == group_data[i].id) {
      grp_li.classList.add("active");
    }
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

socket.on("msg_to_client", () => {
  console.log("hello from client");
  nextMessages();
});

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
  socket.emit("msg_sent");
});

share.addEventListener("submit", async (e) => {
  e.preventDefault();
  const grpId = localStorage.getItem("group");
  const fileInput = document.getElementById("fileInput");
  let selectedFile = fileInput.files[0];

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("groupId", grpId);
  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };

  const response = await axios.post(
    "http://localhost:4000/multimedia-share",
    formData,
    config
  );
  selectedFile = "";
  socket.emit("msg_sent");
});
