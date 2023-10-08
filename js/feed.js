import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPosts } from './utility/get.js';

const feedContainer = document.querySelector('#feed-container');

const renderPosts = (data) => {
  data.forEach((post) => {
    const { body, id, media, tags, title } = post;

    feedContainer.innerHTML += `
    <div class="post-container">
      <a href="./post.html?id=${id}">
        <div class="post-image__container">
          <img class="post-image" src="${media}" />
        </div>
        <h2 class="post-title">${title}</h2>
        <p class="post-body">${body}</p>
        <p class="post-id">${id}</p>
        <p class="post-tags">${tags}</p>
      </a>
    </div>
    `;
  });
};

let limit = 5;
let offset = 0;

getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, renderPosts);

const logoutButton = document.querySelector('#logout-button');
const logoutMessage = document.querySelector('#logout-message');

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
