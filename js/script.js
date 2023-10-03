const myFunc = () => {
  console.log(window.location.pathname);
  if (
    localStorage.getItem('token') &&
    window.location.pathname === '/index.html'
  ) {
    window.location.href = './post-page.html';
  }
};

myFunc();
