const initialState = {
  message: null,
  isError: false
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action.data', action.data)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      console.log('setting notification as ', action.data)
      return action.data
    default:
      console.log('default action')
      return state
  }
}

export const setTimedNotification = (message, isError) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, isError }
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { message: null, isError: false }
      })
    }, 5000)
  }
}


export default reducer