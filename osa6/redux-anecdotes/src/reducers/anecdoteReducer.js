
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE':
      return state.concat(action.data.anecdote)
    case 'VOTE':
      return state.map(elem => elem.id === action.data.id ? { ...elem, votes:elem.votes + 1 } : elem)
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: { anecdote }
  }
}

export default reducer