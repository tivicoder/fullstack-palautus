import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (title, author, url, token) => {
  const request = axios.post(baseUrl, { title, author, url }, {
      headers: { Authorization: `bearer ${token}`}
    })
  return request.then(response => response.data)
}

export default { getAll, create }