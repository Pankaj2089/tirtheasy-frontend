const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/tirtheasy/api';

export async function getData(endpoint) {
  const res = await fetch(`${BASE_URL}/${endpoint}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function postData(endpoint, postData) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  return res.json();
}