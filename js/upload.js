import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { uploadPost } from './utility/post.js';
import { tagsArr } from './utility/tags.js';

const uploadTitle = document.querySelector('#upload-title');
const uploadBody = document.querySelector('#upload-body');
const uploadTags = document.querySelector('#upload-tags');
const uploadMedia = document.querySelector('#upload-media');
const uploadMessage = document.querySelector('#upload-message');
const uploadButton = document.querySelector('#upload-button');
const uploadTitleError = document.querySelector('#upload-title__error');
const uploadMediaError = document.querySelector('#upload-media__error');

const uploadValidation = (data) => {
  if (data.errors) {
    let errorMessage = data.errors[0].message;
    let style = 'upload-error mb-0';
    uploadMessage.innerHTML = `
    <p class="${style}">${errorMessage}</p>
    `;
  } else {
    let successMessage = 'Success! Post was created.';
    let style = 'upload-success mb-0';
    uploadMessage.innerHTML = `
    <p class="${style}">${successMessage}</p>
    `;
    setTimeout(() => {
      window.location = './feed.html';
    }, 1000);
  }
};

const uploadFormValidation = () => {
  let isTitleValid = false;
  let isMediaValid = false;

  let uploadTitleValue = uploadTitle.value.trim();
  let uploadMediaValue = uploadMedia.value.trim();

  if (uploadTitleValue.length >= 3 && !(uploadTitleValue === '')) {
    uploadTitleError.innerHTML = '';
    isTitleValid = true;
  } else {
    uploadTitleError.innerHTML = `
    <p class="mb-0">Title must be more than 3 characters longs.</p>
    `;
    isTitleValid = false;
  }

  if (!(uploadMediaValue === '')) {
    uploadMediaError.innerHTML = '';
    isMediaValid = true;
  } else {
    uploadMediaError.innerHTML = `
    <p class="mb-0">Media is required.</p>
    `;
    isMediaValid = false;
  }

  if (isTitleValid === true && isMediaValid === true) {
    let post = {
      title: uploadTitle.value,
      body: uploadBody.value,
      tags: tagsArr(uploadTags),
      media: uploadMedia.value,
    };
    uploadPost(BASE_URL, POSTS_ENDPOINT, post, uploadValidation);
  }
};

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  uploadFormValidation();
});
