const logoutButton = document.querySelector('#logout-button');
const logoutMessage = document.querySelector('#logout-message');

const feedContainer = document.querySelector('#feed-container');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  let successMessage = 'Success! You logged out.';
  let style = 'logout-success';
  logoutMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
  setTimeout(() => {
    window.location = './index.html';
  }, 1000);
});

async function getPosts() {
  const token = localStorage.getItem('token');
  const res = await fetch(
    'https://api.noroff.dev/api/v1/social/posts?_tag=hyseh',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  renderPosts(data, feedContainer);
}

const renderPosts = (data, target) => {
  const { body, media, tags, title } = data;

  data.forEach((post) => {
    const { body, media, tags, title } = post;

    target.innerHTML += `
    <div class="">
      <h2>${title}</h2>
    </div>
    `;
  });
};

getPosts();
