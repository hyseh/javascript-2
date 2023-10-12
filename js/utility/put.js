export async function updatePost(url, endpoint, id, post) {
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
  } catch (error) {
    console.log(error);
  }
}