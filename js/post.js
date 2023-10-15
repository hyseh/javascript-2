import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';
import { tagsArr } from './utility/tags.js';
import { updatePost } from './utility/put.js';
import { deletePost } from './utility/delete.js';

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const renderOptions = () => {
  const postOptions = document.querySelector('#post-options');

  postOptions.innerHTML += `
  <div class="row d-flex flex-column align-content-center mx-2">
    <div class="col-12 col-md-8 col-lg-6 col-xl-6 col-xxl-4 mb-3 p-0">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">Options</button>
        <ul class="dropdown-menu w-100">
          <li>
            <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#update-modal">Update post</button>
          </li>
          <li>
            <button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete post</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  `;
};

const renderPostSpecific = (data) => {
  const postContainer = document.querySelector('#post-container');
  const username = localStorage.getItem('name');

  const { author, body, media, tags, title } = data;

  if (author.name === username) {
    renderOptions();
  }

  if (body === '') {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title mb-3 post-title">${title}</h5>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">
        <a class="link-secondary link-underline link-underline-opacity-0" href="./profile.html?name=${author.name}">@${author.name}</a>
      </h6>
    </div>
    `;
  } else {
    postContainer.innerHTML = `
    <img src="${media}" class="card-img img-fluid" alt="${title}" loading="lazy" />
    <div class="card-body">
      <h5 class="card-title post-title">${title}</h5>
      <p class="card-text post-body">${body}</p>
      <h6 class="card-subtitle text-body-secondary mb-2 post-author">
        <a class="link-secondary link-underline link-underline-opacity-0" href="./profile.html?name=${author.name}">@${author.name}</a>
      </h6>
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

const updateButton = document.querySelector('#update-button');

updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  console.log('updating');
  updateFormValidation();
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

const updateFormValidation = () => {
  let isTitleValid = false;
  let isMediaValid = false;

  let updateTitleValue = updateTitle.value.trim();
  let updateMediaValue = updateMedia.value.trim();

  if (updateTitleValue.length >= 3 && !(updateTitleValue === '')) {
    updateTitleError.innerHTML = '';
    isTitleValid = true;
  } else {
    updateTitleError.innerHTML = `
    <p>Title must be more than 3 characters longs.</p>
    `;
    isTitleValid = false;
  }

  if (!(updateMediaValue === '')) {
    updateMediaError.innerHTML = '';
    isMediaValid = true;
  } else {
    updateMediaError.innerHTML = `
    <p>Media is required.</p>
    `;
    isMediaValid = false;
  }

  if (isTitleValid === true && isMediaValid === true) {
    console.log(isTitleValid, isMediaValid);
    let post = {
      title: updateTitle.value,
      body: updateBody.value,
      tags: tagsArr(updateTags),
      media: updateMedia.value,
    };
    updatePost(BASE_URL, POSTS_ENDPOINT, id, post, updateValidation);
  } else {
    console.log(isTitleValid, isMediaValid);
    console.log('form is not valid');
  }
};

const deleteButton = document.querySelector('#delete-button');

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

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, renderPostSpecific, updateForm);
