import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (name, number) => {
  return axios.post(baseUrl, {name, number})
}

export default { getAll, create }
