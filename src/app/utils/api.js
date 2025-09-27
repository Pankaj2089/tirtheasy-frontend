const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mainadmin.tirtheasy.com/api';

export async function getData(endpoint) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}


export async function postData(endpoint, postData) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(postData),
  }); 

  if (!res.ok) {
    throw new Error('Failed to post data');
  }

  return res.json();
}