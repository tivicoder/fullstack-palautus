import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [mostVotes, setMostVotes] = useState(0)
  
  const nextAnecdotePressed = () => {
    const anecdoteIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(anecdoteIndex)
  }

  const votePressed = () => {
    const copy = [...points]
    copy[selected] += 1
    updateMostVotes(copy)
    setPoints(copy)
  }

  const updateMostVotes = (newPoints) => {
    let newMostVotes = 0
    for (let i = 0; i < newPoints.length; i++) {
      if (newPoints[i] > newPoints[newMostVotes]) newMostVotes = i
    }
    setMostVotes(newMostVotes)
  }

  return (
    <div>
      <h1> Anecdote of the day </h1>
      <Anecdote anecdote={props.anecdotes[selected]} anecdotePoints={points[selected]} />
      <Button text="vote" handler={votePressed} />
      <Button text="next anecdote" handler={nextAnecdotePressed} />
      <h1> Anecdote with most votes </h1>
      <Anecdote anecdote={props.anecdotes[mostVotes]} anecdotePoints={points[mostVotes]} />
    </div>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <div>
        {props.anecdote}
      </div>
      <div>
        has {props.anecdotePoints} points
      </div>
    </div>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.handler}> {props.text} </button>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)