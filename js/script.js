const myFunc = () => {
  // console.log(window.location.pathname);

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

myFunc();
