export const searchPosts = (input) => {
  let searchValue = input.value.toLowerCase();
  let allPosts = document.querySelectorAll('.post-container');

  for (let i = 0; i < allPosts.length; i++) {
    let title = allPosts[i]
      .querySelector('.post-title')
      .innerHTML.toLowerCase();

    if (title.includes(searchValue)) {
      allPosts[i].style.display = '';
    } else {
      allPosts[i].style.display = 'none';
    }
  }
};
