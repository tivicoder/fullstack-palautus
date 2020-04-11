import axios from 'axios'

const baseUrl = "/api/persons"

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (name, number) => {
  return axios.post(baseUrl, {name, number})
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, remove, update }
