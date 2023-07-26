const message = document.getElementById("msgs");
const send = document.getElementById("btn");
const chats = document.getElementById("chats");
var arr = [];
//localStorage.removeItem("message");
if (!localStorage.getItem("message")) {
  async function getdata() {
    const chat_data = await axios.get("http://localhost:4000/chats");
    const chat_data_size = chat_data.data.data;

    for (let i = 0; i < chat_data_size.length; i++) {
      onsubmit(chat_data.data.data[i], i);
    }
    localStorage.setItem("message", JSON.stringify(arr));
  }
  function onsubmit(data, i) {
    const user_chats = data.chats;
    const username = data.username;

    const li = document.createElement("li");
    li.innerText = `${username}: ${user_chats}`;
    chats.appendChild(li);

    arr.push({ id: i + 1, msgs: user_chats, name: username });
  }
  getdata();
} else {
  const get_msgs = JSON.parse(localStorage.getItem("message"));

  for (let i = 0; i < get_msgs.length; i++) {
    const chat_msg = get_msgs[i].msgs;
    const chat_name = get_msgs[i].name;
    const li = document.createElement("li");
    li.innerText = `${chat_name}: ${chat_msg}`;
    chats.appendChild(li);
  }
}

async function get_chat() {
  const get_msgs = JSON.parse(localStorage.getItem("message"));
  const existing_data = JSON.parse(localStorage.getItem("message")) || [];

  const getChat = await axios.get(
    `http://localhost:4000/chat/${get_msgs.length}`
  );

  const data = getChat.data.data;

  const data_size = data.length;
  let j = 0;
  let k = 0;
  if (data.length > 0) {
    for (j = data[j].id; j <= data[data_size - 1].id; j++) {
      const li = document.createElement("li");
      li.innerText = `${data[k].username}: ${data[k].chats}`;
      chats.appendChild(li);
      existing_data.push({
        id: j,
        msgs: data[k].chats,
        name: data[k].username,
      });
      k++;
    }
  }

  localStorage.setItem("message", JSON.stringify(existing_data));
}
get_chat();

setInterval(() => {
  get_chat();
}, 1000);

send.addEventListener("click", async (e) => {
  get_chat();
  const obj = {
    chats: message.value,
    userId: localStorage.getItem("userId"),
  };
  const token = localStorage.getItem("userId");
  const config = { headers: { Authorization: token } };

  const msg = await axios.post("http://localhost:4000/message", obj, config);
  const chat_name = msg.data.data.username;

  let storage = JSON.parse(localStorage.getItem("message")) || [];
  const newItem = {
    id: storage.length + 1,
    msgs: message.value,
    name: chat_name,
  };
  message.value = "";
  storage.push(newItem);
  localStorage.setItem("message", JSON.stringify(storage));

  removeExcessItems();
});
//localStorage.removeItem("message");

function removeExcessItems() {
  let storage = JSON.parse(localStorage.getItem("message"));

  if (storage.length > 10) {
    console.log(storage.length);
    storage = storage.slice(1);
    localStorage.setItem("message", JSON.stringify(storage));
  }
}
