export async function loginUser(url, endpoint, user, validate) {
  try {
    const res = await fetch(url + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    validate(data, user);
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(url, endpoint, user, validate) {
  try {
    const res = await fetch(url + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    validate(data, user);
  } catch (error) {
    console.log(error);
  }
}

export async function uploadPost(url, endpoint, post, validate) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });
    const data = await res.json();
    validate(data);
  } catch (error) {
    console.log(error);
  }
}

export async function postComment(url, endpoint, id, comment, validate) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(url + endpoint + id + '/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json();
    validate(data);
  } catch (error) {
    console.log(error);
  }
}
