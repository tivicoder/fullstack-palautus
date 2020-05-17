import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from  '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    console.log('createNew: ', event.target.anecdote.value)
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const createdAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(createdAnecdote))
    dispatch(setNotification(`you created '${createdAnecdote.content}'`))
    setTimeout(function(){ dispatch(setNotification("")) }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
