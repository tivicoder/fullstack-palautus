import React from 'react';

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
      <h2>{props.course}</h2>
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
  const totalExercises = parts.reduce((total, elem) => total += elem.exercises, 0)

  return (
    <div>
      <p><b>total of exercises {totalExercises}</b></p>
    </div>
  )
}

export default Course;