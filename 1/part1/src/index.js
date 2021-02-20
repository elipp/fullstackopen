import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  )
}

const Total = ({totalExercises}) => {
  return (
    <div>
      <p>Number of exercises {totalExercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
    countTotal: () => course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  }

  return (
    <div>
      <Course course={course}/>
      <Content parts={course.parts}/>
      <Total totalExercises={course.countTotal()}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

