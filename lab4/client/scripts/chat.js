const ENTER_KEY_CODE = 13;
const messageContainerEl = document.querySelector('.message-container');
const usernameTextEl = document.querySelector('.username-text');
const sendMessageButton = document.querySelector('.send-button');
const messageInput = document.getElementById('message-input');

const username = sessionStorage.getItem('username');
if (!username) {
  window.location.replace('./index.html');
}

usernameTextEl.textContent = username;
const socket = io(`http://localhost:8080`, {
  query: { username },
});

const appendMessage = (message, username, isSender) => {
  const senderPrefix = isSender ? `${username} (you):` : `${username}:`;
  const messageWithSender = `${senderPrefix} ${message}`;

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.textContent = messageWithSender;

  messageContainerEl.appendChild(messageDiv);
};

const onClickSendButton = () => {
  const message = messageInput.value;
  if (!message) {
    return;
  }

  messageInput.value = '';
  appendMessage(message, username, true);
  socket.emit('message', { message, username });
};

socket.on('message', ({ message, username }) => {
  appendMessage(message, username, false);
});

const onKeyUpSubmit = (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    sendMessageButton.click();
  }
};

sendMessageButton.addEventListener('click', onClickSendButton);
window.addEventListener('keyup', onKeyUpSubmit);
