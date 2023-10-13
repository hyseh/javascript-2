import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';
import { tagsArr } from './utility/tags.js';
import { updatePost } from './utility/put.js';
import { deletePost } from './utility/delete.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const renderPostSpecific = (data) => {
  const postContainer = document.querySelector('#post-container');

  const { author, body, media, tags, title } = data;

  if (body === '') {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title mb-3 post-title">${title}</h5>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
    </div>
    `;
  } else {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title post-title">${title}</h5>
      <p class="card-text post-body">${body}</p>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">@${author.name}</h6>
    </div>
    `;
  }
};

const updateTitle = document.querySelector('#update-title');
const updateBody = document.querySelector('#update-body');
const updateTags = document.querySelector('#update-tags');
const updateMedia = document.querySelector('#update-media');
const updateTitleError = document.querySelector('#update-title__error');
const updateMediaError = document.querySelector('#update-media__error');

const updateForm = (data) => {
  console.log('form was updated');
  updateTitle.value = data.title;
  updateBody.value = data.body;
  updateTags.value = data.tags;
  updateMedia.value = data.media;
};

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, renderPostSpecific, updateForm);

const updateButton = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');

updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('update');
  let post = {
    title: updateTitle.value,
    body: updateBody.value,
    tags: tagsArr(updateTags),
    media: updateMedia.value,
  };
  updatePost(BASE_URL, POSTS_ENDPOINT, id, post, updateValidation);
});

const updateValidation = (data) => {
  const updateMessage = document.querySelector('#update-message');

  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'update-error';
    updateMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Post was updated.';
    let style = 'update-success';
    updateMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

deleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('deleting');
  deletePost(id, deleteValidation);
});

const deleteValidation = (data) => {
  const postMessage = document.querySelector('#delete-message');

  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'delete-error';
    postMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Post was deleted.';
    let style = 'delete-success';
    postMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location = './feed.html';
    }, 1000);
  }
};
