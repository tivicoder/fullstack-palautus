import React from 'react'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList></AnecdoteList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  )
}

export default App