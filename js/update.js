import { BASE_URL, POSTS_ENDPOINT } from './utility/api.js';
import { getPostSpecific } from './utility/get.js';
import { updatePost } from './utility/put.js';
import { tagsArr } from './utility/tags.js';

const updateTitle = document.querySelector('#update-title');
const updateBody = document.querySelector('#update-body');
const updateTags = document.querySelector('#update-tags');
const updateMedia = document.querySelector('#update-media');
const updateMessage = document.querySelector('#update-message');
const updateButton = document.querySelector('#update-button');

const updateTitleError = document.querySelector('#update-title__error');
const updateMediaError = document.querySelector('#update-media__error');

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get('id');

const updateForm = (data) => {
  updateTitle.value = data.title;
  updateBody.value = data.body;
  updateTags.value = data.tags;
  updateMedia.value = data.media;
};

updateButton.addEventListener('click', (e) => {
  e.preventDefault();
  let post = {
    title: updateTitle.value,
    body: updateBody.value,
    tags: tagsArr(updateTags),
    media: updateMedia.value,
  };
  updatePost(BASE_URL, POSTS_ENDPOINT, id, post);
});

getPostSpecific(BASE_URL, POSTS_ENDPOINT, id, updateForm);
