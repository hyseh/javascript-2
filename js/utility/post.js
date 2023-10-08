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
    console.log(data);
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
    console.log(data);
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
    console.log(data);
    validate(data);
  } catch (error) {
    console.log(error);
  }
}
