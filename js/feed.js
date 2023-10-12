import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPosts } from './utility/get.js';
import { searchPosts } from './utility/search.js';

const renderPosts = (data) => {
  const feedContainer = document.querySelector('#feed-container');

  data.forEach((post) => {
    const { author, body, id, media, tags, title } = post;

    if (body === '') {
      feedContainer.innerHTML += `
      <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 mb-3 h-100 p-0 post-container">
        <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
        <div class="card-body">
          <h5 class="card-title mb-3 post-title">${title}</h5>
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
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
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
          <a class="stretched-link" href="./post.html?id=${id}"></a>
        </div>
      </div>
      `;
    }
  });
};

let limit = 20;
let offset = 0;

getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, renderPosts);

const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  setTimeout(() => {
    window.location = './index.html';
  }, 1000);
});

const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', (e) => {
  searchPosts(searchInput);
});

/*
let trigger = document.querySelector('.observer-trigger');

const options = {
  root: null,
  treshold: 0,
  rootMargin: '-150px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    if (entry.isIntersecting) {
      offset += limit;
      console.log(limit, offset);
      getPosts(BASE_URL, POSTS_ENDPOINT, limit, offset, renderPosts);
    }
  }, options);
});

observer.observe(trigger);
*/
