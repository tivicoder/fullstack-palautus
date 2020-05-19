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

let timeoutId = 0

export const setNotification = (anecdote, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      anecdote
    })

    if (timeoutId !== 0) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(function(){
      timeoutId = 0
      dispatch({
        type: 'SET_NOTIFICATION',
        anecdote: ""
      })
    }, timeout);
  }
}

export default reducer
