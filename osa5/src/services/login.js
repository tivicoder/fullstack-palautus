import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  try {
    console.log(`trying to login with: ${username}/${password}`)
    const response = await axios.post(baseUrl, { username, password })
    console.log('got response: ', response.data)
    return response.data
  } catch(error) {
    console.log('login.js: ', error)
    return null
  }
}

export default { login }
