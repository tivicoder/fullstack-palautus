const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.anecdote
    default:
      return state
  }
}

export const setNotification = (anecdote) => {
  return {
    type: 'SET_NOTIFICATION',
    anecdote
  }
}

export default reducer
