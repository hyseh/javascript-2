import { BASE_URL, PROFILES_ENDPOINT } from './utility/api.js';
import { getProfile } from './utility/get.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const user = param.get('name');

const renderProfile = (data) => {
  const profileContainer = document.querySelector('#profile-container');
  const { avatar, name } = data;
  const { followers, following, posts } = data._count;

  if (avatar === null || avatar === '') {
    profileContainer.innerHTML += `
    <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 p-0 w-100">
      <div class="card-body">
        <div class="d-flex justify-content-center mb-3">
          <div class="ratio ratio-1x1 w-25">
            <img src="./images/avatar.webp" class="d-inline-block rounded-circle" alt="..." />
          </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap w-100">
          <div class="me-3">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle text-body-secondary mb-3">@${name}</h6>
          </div>
        <div>
          <button type="button" class="btn btn-secondary w-100">Follow</button>
        </div>
      </div>
      <div>
        <ul class="card-stats">
          <li>${posts} Posts</li>
          <li>${followers} Followers</li>
          <li>${following} Following</li>
        </ul>
      </div>
    </div>
  </div>
  `;
  } else {
    profileContainer.innerHTML += `
    <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 p-0 w-100">
      <div class="card-body">
        <div class="d-flex justify-content-center mb-3">
          <div class="ratio ratio-1x1 w-25">
            <img src="${avatar}" class="d-inline-block rounded-circle" alt="..." />
          </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap w-100">
          <div class="me-3">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle text-body-secondary mb-3">@${name}</h6>
          </div>
        <div>
          <button type="button" class="btn btn-secondary w-100">Follow</button>
        </div>
      </div>
      <div>
        <ul class="card-stats">
          <li>${posts} Posts</li>
          <li>${followers} Followers</li>
          <li>${following} Following</li>
        </ul>
      </div>
    </div>
  </div>
  `;
  }

  renderProfilePosts(data);
};

const renderProfilePosts = (data) => {
  const feedContainer = document.querySelector('#feed-container');
  const { posts } = data;

  posts.forEach((post) => {
    const { owner, body, id, media, tags, title } = post;

    if (body === '') {
      feedContainer.innerHTML += `
      <div class="card col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 mb-3 h-100 p-0 post-container">
        <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
        <div class="card-body">
          <h5 class="card-title mb-3 post-title">${title}</h5>
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${owner}</h6>
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
          <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${owner}</h6>
          <a class="stretched-link" href="./post.html?id=${id}"></a>
        </div>
      </div>
      `;
    }
  });
};

getProfile(BASE_URL, PROFILES_ENDPOINT, user, renderProfile);

const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  setTimeout(() => {
    window.location = './index.html';
  }, 1000);
});
