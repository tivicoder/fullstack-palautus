import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  let partComponents = []
  for (let i=0; i < parts.length; i++) {
    partComponents.push(<Part key={parts[i].id} name={parts[i].name} count={parts[i].exercises} />)
  }

  return (
    <div>
      {partComponents}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.count}
      </p>
    </div>
  )  
}

const Total = ({parts}) => {
  let totalExercises = 0
  for (let i=0; i < parts.length; i++) {
    totalExercises += parts[i].exercises
  }

  return (
    <div>
      <p><b>total of exercises {totalExercises}</b></p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))