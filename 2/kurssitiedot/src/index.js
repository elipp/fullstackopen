import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course.js'


const App = () => {
  const courses = [{
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
        name: "jooh elikkas",
        exercises: 99,
        id: 4
      }
    ],
  },
  {
    name: 'Test course 2',
    id: 2,
    parts: [
      {
        name: 'Fundamentals of aha',
        exercises: 533,
        id: 1
      },
      {
        name: 'Advanced ahaing',
        exercises: 3,
        id: 2
      }
    ]
  }
  ]

  return (
    <div>
      {courses.map(c => <Course key={c.id} course={c}/>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
