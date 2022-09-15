export default function fetcher(url: string, data = undefined, method = 'GET') {
  return fetch(`${window.location.origin}/api/${url}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 299 && res.status < 200) {
      throw new Error()
    }
    return res.json()
  })
}
