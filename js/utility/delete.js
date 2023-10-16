export async function deletePost(url, endpoint, id, validate) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    validate(data);
  } catch (error) {
    console.log(error);
  }
}
