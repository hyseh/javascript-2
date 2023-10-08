export async function deletePost(id, validate) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      `https://api.noroff.dev/api/v1/social/posts/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    validate(data);
  } catch (error) {
    console.log(error);
  }
}

const deleteValidation = (data) => {
  const postMessage = document.querySelector('#post-message');

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
