const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

const handleFocus = () => {
  messageInput.focus();
};

const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement("p");
  messageElem.innerHTML = `<span>${text}</span>`;
  messageElem.classList.add("message", author);
  conversationElem.appendChild(messageElem);
  console.log(message);
  handleFocus();
  if (author === "user") {
    messageInput.value = "";
  }
  conversationElem.scrollTop = conversationElem.scrollHeight;
};

const sendMessage = (e) => {
  e.preventDefault();
  console.log("Send button clicked!");
  const message = { author: "user", text: messageInput.value };
  updateConversation(message);
};

fetch("/cat-message")
  .then((res) => res.json())
  .then((data) => {
    updateConversation(data.message);
  });

handleFocus();
