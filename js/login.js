const loginEmailInput = document.querySelector('#login-email');
const loginPasswordInput = document.querySelector('#login-password');
const loginMessage = document.querySelector('#login-message');
const loginButton = document.querySelector('#login-button');

async function loginUser() {
  let emailValue = loginEmailInput.value;
  let passwordValue = loginPasswordInput.value;

  let user = {
    email: emailValue,
    password: passwordValue,
  };

  const res = await fetch('https://api.noroff.dev/api/v1/social/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  console.log(data);
  loginValidation(data);
}

const loginValidation = (data) => {
  if (data.errors) {
    // localStorage.removeItem('token');
    let errorMessage = data.errors[0].message;
    let style = 'login-error';
    loginMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    localStorage.setItem('token', data.accessToken);
    loginMessage.innerHTML = ``;
    window.location = '../post-page.html';
  }
};

loginButton.addEventListener('click', (e) => {
  e.preventDefault();
  loginUser();
});
