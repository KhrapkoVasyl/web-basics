const ENTER_KEY_CODE = 13;
const usernameInput = document.getElementById('username-input');
const inputSubmitButton = document.querySelector('.btn');
const username = sessionStorage.getItem('username');

if (username) {
  usernameInput.value = username;
}

const onClickSubmitButton = () => {
  const inputedUsername = usernameInput.value;
  if (!inputedUsername) {
    return;
  }

  sessionStorage.setItem('username', inputedUsername);
  window.location.replace('./chat.html');
};

const onKeyUpSubmit = (e) => {
  if (e.keyCode === ENTER_KEY_CODE) {
    inputSubmitButton.click();
  }
};

inputSubmitButton.addEventListener('click', onClickSubmitButton);
window.addEventListener('keyup', onKeyUpSubmit);
