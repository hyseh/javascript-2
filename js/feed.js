import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPosts } from './utility/get.js';
import { searchPosts } from './utility/search.js';

const renderPosts = (data) => {
  const feedContainer = document.querySelector('#feed-container');
  feedContainer.innerHTML = '';

  data.forEach((post) => {
    const { author, body, id, media, tags, title } = post;

    if (body === '') {
      feedContainer.innerHTML += `
      <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 mb-3 h-100 p-0 post-container">
        <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
        <div class="card-body">
          <h5 class="card-title mb-3 post-title">${title}</h5>
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">
            <a class="link-secondary link-underline link-underline-opacity-0 link-author" href="./profile.html?name=${author.name}">@${author.name}</a>
          </h6>
          <a class="stretched-link" href="./post.html?id=${id}"></a>
        </div>
      </div>
      `;
    } else {
      feedContainer.innerHTML += `
      <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 mb-3 h-100 p-0 post-container">
        <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
        <div class="card-body">
          <h5 class="card-title post-title">${title}</h5>
          <p class="card-text post-body">${body}</p>
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">
            <a class="link-secondary link-underline link-underline-opacity-0 link-author" href="./profile.html?name=${author.name}">@${author.name}</a>
          </h6>
          <a class="stretched-link" href="./post.html?id=${id}"></a>
        </div>
      </div>
      `;
    }
  });
};

let limit = 20;
let offset = 0;
let ascending = 'asc';
let descending = 'desc';

getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, descending, renderPosts);

const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', (e) => {
  searchPosts(searchInput);
});

const filterOldestButton = document.querySelector('#filter-oldest');

filterOldestButton.addEventListener('click', (e) => {
  getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, ascending, renderPosts);
});

const filterNewestButton = document.querySelector('#filter-newest');

filterNewestButton.addEventListener('click', (e) => {
  getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, descending, renderPosts);
});
