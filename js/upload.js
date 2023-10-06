const uploadTitle = document.querySelector('#upload-title');
const uploadBody = document.querySelector('#upload-body');
const uploadTags = document.querySelector('#upload-tags');
const uploadMedia = document.querySelector('#upload-media');
const uploadButton = document.querySelector('#upload-button');

// console.log(uploadTitle, uploadBody, uploadTags, uploadMedia, uploadButton);

async function uploadPosts(post) {
  const token = localStorage.getItem('token');
  const res = await fetch('https://api.noroff.dev/api/v1/social/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  console.log(data);
}

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  let post = {
    title: uploadTitle.value,
    body: uploadBody.value,
    tags: tagArr(),
    media: '',
  };
  console.log(post);
  // uploadPosts(post);
});

const tagArr = () => {
  let tagValue = uploadTags.value.toLowerCase();
  let tag = tagValue.replace(/\s+/g, '');
  let arr = ['hyseh'];

  if (!tag === '') {
  } else {
    tag.split(',').forEach((tag) => {
      if (tag.length >= 2 && !arr.includes(tag)) {
        arr.push(tag);
        console.log(arr);
      }
    });
  }
  return arr;
};
