const Course = ({course}) => {
   const countTotal = (c) => {
      return c.parts.reduce((acc, cur) => {
      return {exercises: acc.exercises + cur.exercises}
    }).exercises
  }

  return (
    <div>
    <h1>{course.name}</h1>
    {course.parts.map(p => <Part key={p.id} part={p} />)}
    <p><b>total exercises: {countTotal(course)}</b></p>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

export default Course