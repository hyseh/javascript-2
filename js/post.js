import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';
import { deletePost, deleteValidation } from './utility/delete.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const renderPostSpecific = (data) => {
  const postContainer = document.querySelector('#post-container');

  const { author, body, media, tags, title } = data;

  /*
  let mediaContainer = document.createElement('img');
  let titleContainer = document.createElement('h2');
  let bodyContainer = document.createElement('p');
  let tagsContainer = document.createElement('p');
  let deleteButton = document.createElement('button');
  let updateButton = document.createElement('button');

  bodyContainer.innerText = body;
  titleContainer.innerText = title;
  tagsContainer.innerText = tags;
  deleteButton.innerText = 'Delete';
  updateButton.innerText = 'Update';

  deleteButton.addEventListener('click', () => {
    console.log('test');
    deletePost(id, deleteValidation);
  });

  updateButton.addEventListener('click', () => {
    console.log('update');
    window.location = `./update.html?id=${id}`;
  });

  postContainer.appendChild(mediaContainer);
  postContainer.appendChild(bodyContainer);
  postContainer.appendChild(titleContainer);
  postContainer.appendChild(tagsContainer);
  postContainer.appendChild(deleteButton);
  postContainer.appendChild(updateButton);
  */

  if (body === '') {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title mb-3 post-title">${title}</h5>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
      <a class="stretched-link" href="./post.html?id=${id}"></a>
    </div>
    `;
  } else {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title post-title">${title}</h5>
      <p class="card-text post-body">${body}</p>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
      <a class="stretched-link" href="./post.html?id=${id}"></a>
    </div>
    `;
  }
};

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, renderPostSpecific);
