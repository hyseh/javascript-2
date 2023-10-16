import { BASE_URL, LOGIN_ENDPOINT, REGISTER_ENDPOINT } from './utility/api.js';
import { loginUser } from './utility/post.js';
import { registerUser } from './utility/post.js';

const registerNameInput = document.querySelector('#register-name');
const registerEmailInput = document.querySelector('#register-email');
const registerPasswordInput = document.querySelector('#register-password');
const registerMessage = document.querySelector('#register-message');
const registerButton = document.querySelector('#register-button');

const registerNameError = document.querySelector('#register-name__error');
const registerEmailError = document.querySelector('#register-email__error');
const registerPasswordError = document.querySelector(
  '#register-password__error'
);

const registerValidation = (data, user) => {
  registerNameError.innerHTML = '';
  registerEmailError.innerHTML = '';
  registerPasswordError.innerHTML = '';

  if (data.errors) {
    for (let i = 0; i < data.errors.length; i++) {
      if (data.errors[0].message === 'Profile already exists') {
        let errorMessage = 'Error! Profile already exists.';
        let style = 'register-error';
        registerMessage.innerHTML = `
        <p class="${style}">${errorMessage}</p>
        `;
      } else {
        if (data.errors[i].path[0] === 'name') {
          registerNameError.innerHTML = `
          <p class="">${data.errors[i].message}</p>
          `;
        }

        if (data.errors[i].path[0] === 'email') {
          registerEmailError.innerHTML += `
          <p class="">${data.errors[i].message}</p>
          `;
        }

        if (data.errors[i].path[0] === 'password') {
          registerPasswordError.innerHTML = `
          <p class="">${data.errors[i].message}</p>
          `;
        }
      }
    }
  } else {
    let successMessage = 'Success! Your account was created.';
    let style = 'register-success';
    registerMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    loginUser(BASE_URL, LOGIN_ENDPOINT, user, autoLogin);
  }
};

export const autoLogin = (data) => {
  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'login-error';
    registerMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    localStorage.setItem('token', data.accessToken);
    setTimeout(() => {
      window.location = './feed.html';
    }, 1000);
  }
};

registerButton.addEventListener('click', (e) => {
  e.preventDefault();
  let user = {
    name: registerNameInput.value,
    email: registerEmailInput.value,
    password: registerPasswordInput.value,
  };
  registerUser(BASE_URL, REGISTER_ENDPOINT, user, registerValidation);
});
