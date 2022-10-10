const dev = process.env.NODE_ENV !== 'production'
export const server = dev
  ? 'http://localhost:3000'
  : 'https://product-feedback-v2-ten.vercel.app'

export default function fetcher(url: string, data = undefined, method = 'GET') {
  return fetch(`${server}/api/${url}`, {
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
