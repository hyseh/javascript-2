export async function updatePost(url, endpoint, id, post, validate) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    console.log(data);
    validate(data);
  } catch (error) {
    console.log(error);
  }
}
