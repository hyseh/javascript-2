import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const renderPostSpecific = (data) => {
  const postContainer = document.querySelector('#post-container');

  const { body, media, tags, title } = data;

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
};

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, renderPostSpecific);
