import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';
import { tagsArr } from './utility/tags.js';
import { postComment } from './utility/post.js';
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

const commentsContainer = document.querySelector('#comments-container');

const renderComments = (data) => {
  const { comments } = data;

  comments.forEach((comment) => {
    const { author, body } = comment;
    commentsContainer.innerHTML += `
    <div class="d-flex">
      <a class="link-secondary link-underline link-underline-opacity-0 me-2" href="./profile.html?name=${author.name}">
        <p class="card-text text-body-secondary comment-author">@${author.name}</p>
      </a>
      <p class="card-text comment-body">${body}</p>
    </div>
    `;
  });
};

const renderPostSpecific = (data) => {
  const postContainer = document.querySelector('#post-container');
  const username = localStorage.getItem('name');

  const { author, comments, body, media, tags, title } = data;

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

  if (comments.length === 0) {
  } else {
    commentsContainer.classList.remove('comments-hidden');
    commentsContainer.classList.add('d-flex', 'flex-column', 'gap-2', 'pb-0');
    renderComments(data);
  }
};

const updateTitle = document.querySelector('#update-title');
const updateBody = document.querySelector('#update-body');
const updateTags = document.querySelector('#update-tags');
const updateMedia = document.querySelector('#update-media');
const updateTitleError = document.querySelector('#update-title__error');
const updateMediaError = document.querySelector('#update-media__error');

const updateForm = (data) => {
  updateTitle.value = data.title;
  updateBody.value = data.body;
  updateTags.value = data.tags;
  updateMedia.value = data.media;
};

const updateButton = document.querySelector('#update-button');

updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  updateFormValidation();
});

const updateValidation = (data) => {
  const updateMessage = document.querySelector('#update-message');

  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'update-error mb-0';
    updateMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Post was updated.';
    let style = 'update-success mb-0';
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
  // DISABLED let isMediaValid = false;

  let updateTitleValue = updateTitle.value.trim();
  // DISABLED let updateMediaValue = updateMedia.value.trim();

  if (updateTitleValue.length >= 3 && !(updateTitleValue === '')) {
    updateTitleError.innerHTML = '';
    isTitleValid = true;
  } else {
    updateTitleError.innerHTML = `
    <p class="mb-0">Title must be more than 3 characters longs.</p>
    `;
    isTitleValid = false;
  }

  /* DISABLED MEDIA UPDATE
  if (!(updateMediaValue === '')) {
    updateMediaError.innerHTML = '';
    isMediaValid = true;
  } else {
    updateMediaError.innerHTML = `
    <p class="mb-0">Media is required.</p>
    `;
    isMediaValid = false;
  }

  if (isTitleValid === true && isMediaValid === true) {
    let post = {
      title: updateTitle.value,
      body: updateBody.value,
      tags: tagsArr(updateTags),
      media: updateMedia.value,
    };
    updatePost(BASE_URL, POSTS_ENDPOINT, id, post, updateValidation);
  }
  */

  if (isTitleValid === true) {
    let post = {
      title: updateTitle.value,
      body: updateBody.value,
      tags: tagsArr(updateTags),
    };
    updatePost(BASE_URL, POSTS_ENDPOINT, id, post, updateValidation);
  }
};

const deleteButton = document.querySelector('#delete-button');

deleteButton.addEventListener('click', (e) => {
  e.preventDefault();
  deletePost(BASE_URL, POSTS_ENDPOINT, id, deleteValidation);
});

const deleteValidation = (data) => {
  const postMessage = document.querySelector('#delete-message');

  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'delete-error mb-0';
    postMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Post was deleted.';
    let style = 'delete-success mb-0';
    postMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location = './feed.html';
    }, 1000);
  }
};

const commentInput = document.querySelector('#comment-input');
const commmentButton = document.querySelector('#comment-button');
const commentMessage = document.querySelector('#comment-message');

commmentButton.addEventListener('click', (e) => {
  e.preventDefault();
  commentFormValidation();
});

const commentValidation = (data) => {
  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'comment-error mb-0';
    commentMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Comment was posted.';
    let style = 'comment-success mb-0';
    commentMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

const commentFormValidation = () => {
  let isCommentValid = false;

  let commentValue = commentInput.value;

  if (commentValue.length >= 3 && !(commentValue === '')) {
    commentMessage.innerHTML = '';
    isCommentValid = true;
  } else {
    commentMessage.innerHTML = `
    <p class="mb-0">Comment must be more than 3 characters longs.</p>
    `;
    isCommentValid = false;
  }

  if (isCommentValid === true) {
    let comment = {
      body: commentInput.value,
    };
    postComment(BASE_URL, POSTS_ENDPOINT, id, comment, commentValidation);
  }
};

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, renderPostSpecific, updateForm);
