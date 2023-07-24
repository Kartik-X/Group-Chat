const message = document.getElementById("msgs");
const send = document.getElementById("btn");
const user = document.getElementById("user");
const chats = document.getElementById("chats");

// async function getdata() {
//   const chat_data = await axios.get("http://localhost:4000/chats");
//   const chat_data_size = chat_data.data.data;
//   for (let i = 0; i < chat_data_size.length; i++) {
//     onsubmit(chat_data.data.data[i]);
//   }
//   console.log(chat_data.data.data[0]);
// }
// function onsubmit() {
//     const user_id=chat_data_size.Id;
//     const user_chats=chat_data_size.chats;

// }
// getdata();

send.addEventListener("click", () => {
  const obj = {
    chats: message.value,
    userId: localStorage.getItem("userId"),
  };
  const msg = axios.post("http://localhost:4000/message", obj);

  const li = document.createElement("li");
  li.innerText = message.value;
  chats.appendChild(li);
  message.value = "";
});
