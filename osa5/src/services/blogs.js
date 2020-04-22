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

const update = (id, blog) => {
  return axios
    .put(`${baseUrl}/${id}`, blog)
    .then(response => response.data)
}

const remove = (id, token) => {
  return axios
    .delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `bearer ${token}`} })
    .then(response => response)
}

export default { getAll, create, update, remove }
