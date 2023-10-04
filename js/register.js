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

async function registerUser() {
  let nameValue = registerNameInput.value;
  let emailValue = registerEmailInput.value;
  let passwordValue = registerPasswordInput.value;

  let user = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
  };

  const res = await fetch(
    'https://api.noroff.dev/api/v1/social/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }
  );
  const data = await res.json();
  console.log(data);
  registerValidation(data);
}

const registerValidation = (data) => {
  registerNameError.innerHTML = '';
  registerEmailError.innerHTML = '';
  registerPasswordError.innerHTML = '';

  if (data.errors) {
    for (let i = 0; i < data.errors.length; i++) {
      // console.log(data.errors[i]);

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
    setTimeout(() => {
      // add auto login user
    }, 1000);
  }
};

registerButton.addEventListener('click', (e) => {
  e.preventDefault();
  registerUser();
  console.log('clicked');
});
