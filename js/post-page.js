const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  console.log('you logged out');
  setTimeout(() => {
    window.location = '../index.html';
  }, 1000);
});

async function getPosts() {
  const token = localStorage.getItem('token');
  const res = await fetch('https://api.noroff.dev/api/v1/social/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
}

getPosts();
