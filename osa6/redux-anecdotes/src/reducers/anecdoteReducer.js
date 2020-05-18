import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'CREATE':
      console.log('create return: ', state.concat(action.data))
      return state.concat(action.data)
    case 'VOTE':
      return state.map(elem => elem.id === action.data.id ? action.data : elem)
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: createdAnecdote
    })
  }
}

export default reducer