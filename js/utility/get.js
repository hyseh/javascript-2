export async function getPosts(url, endpoint, limit, offset, render) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(
      url + endpoint + `?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getPostSpecific(url, endpoint, id, render) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    render(data);
  } catch (error) {
    console.log(error);
  }
}
