const myFunc = () => {
  // console.log(window.location.pathname);

  if (
    (localStorage.getItem('token') &&
      window.location.pathname === '/index.html') ||
    window.location.pathname === '/'
  ) {
    window.location.href = './post-page.html';
  } else if (
    !localStorage.getItem('token') &&
    window.location.pathname === '/post-page.html'
  ) {
    window.location.href = './index.html';
  }
};

myFunc();
