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
