const message = document.getElementById("msgs");
const send = document.getElementById("btn");
const user = document.getElementById("user");
const chats = document.getElementById("chats");

async function getdata() {
  const chat_data = await axios.get("http://localhost:4000/chats");
  const chat_data_size = chat_data.data.data;

  for (let i = 0; i < chat_data_size.length; i++) {
    onsubmit(chat_data.data.data[i]);
  }
  console.log(chat_data.data.data[0]);
}
function onsubmit(data) {
  const user_id = data.userId;
  const user_chats = data.chats;

  const li = document.createElement("li");
  li.innerText = user_chats;
  chats.appendChild(li);
}
getdata();

send.addEventListener("click", async (e) => {
  chats.innerText = "";

  const obj = {
    chats: message.value,
    userId: localStorage.getItem("userId"),
  };

  await getdata();

  const msg = await axios.post("http://localhost:4000/message", obj);

  const li = document.createElement("li");
  li.innerText = message.value;
  chats.appendChild(li);

  message.value = "";
});
