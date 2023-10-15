const checkToken = () => {
  if (
    (localStorage.getItem('token') &&
      window.location.pathname === '/index.html') ||
    window.location.pathname === '/'
  ) {
    window.location.href = './feed.html';
  } else if (
    !localStorage.getItem('token') &&
    window.location.pathname === '/feed.html'
  ) {
    window.location.href = './index.html';
  }
};

checkToken();

const navProfile = () => {
  const profileButton = document.querySelector('#profile-button');

  if (
    window.location.pathname === '' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/register.html' ||
    window.location.pathname === '/profile.html'
  ) {
  } else {
    profileButton.addEventListener('click', () => {
      let username = localStorage.getItem('name');
      window.location.href = `./profile.html?name=${username}`;
    });
  }
};

navProfile();
