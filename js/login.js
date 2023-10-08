import { BASE_URL, LOGIN_ENDPOINT } from './utility/api.js';
import { loginUser } from './utility/post.js';

const loginEmailInput = document.querySelector('#login-email');
const loginPasswordInput = document.querySelector('#login-password');
const loginMessage = document.querySelector('#login-message');
const loginButton = document.querySelector('#login-button');

export const loginValidation = (data) => {
  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'login-error';
    loginMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    localStorage.setItem('token', data.accessToken);
    let successMessage = 'Success! You logged in.';
    let style = 'login-success';
    loginMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location = './feed.html';
    }, 1000);
  }
};

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  let user = {
    email: loginEmailInput.value,
    password: loginPasswordInput.value,
  };
  loginUser(BASE_URL, LOGIN_ENDPOINT, user, loginValidation);
});
