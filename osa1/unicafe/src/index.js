import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>    
      <h1>give feedback</h1>
      <Button name="Good" handler={incrementGood} />
      <Button name="Neutral" handler={incrementNeutral} />
      <Button name="Bad" handler={incrementBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({name, handler}) => {
  return (
    <>
      <button onClick={handler}> {name} </button>
    </>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  const average = all ? (good - bad) / all : 0
  const positive = all ? 100 * good / all + "%" : "0 %"
  return all ? (
    <div>
      <StatisticHeader />
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <StatisticHeader />
      No feedback given
    </div>
    )
}

const StatisticHeader = () => {
  return (
    <div>
      <h1>statistics</h1>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
