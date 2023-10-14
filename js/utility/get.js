export async function getPosts(url, endpoint, limit, offset, sort, render) {
  let tag = '&_tag=hyseh';
  let author = '&_author=true';
  let param = `?limit=${limit}&offset=${offset}&sortOrder=${sort}${tag}${author}`;
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + param, {
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

export async function getPostSpecific(url, endpoint, id, render, update) {
  let author = '?_author=true';
  let comments = '&_comments=true';
  let param = `${author}${comments}`;
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id + param, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data);
    render(data);
    update(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getProfile(url, endpoint, id, render) {
  let author = '?_author=true';
  let posts = '?_posts=true';
  let param = `${posts}`;

  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id + param, {
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
