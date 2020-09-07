import userService from '../services/users'

const initialState = {
  allUsers: [],
  loggedUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedUser: action.data }
    case 'INIT_USERS':
      return { ...state, allUsers: action.data }
    default:
      return state
  }
}

export const setLoggedUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const initUsers = () => {
  console.log('initUsers()')
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer