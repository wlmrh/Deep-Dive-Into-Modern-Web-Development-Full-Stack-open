const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  const total = parts.reduce(
    (accumulator, val) => accumulator + val.exercises,
    0
  )
  return (
    <div>
      {parts.map(value => (
        <Part key={value.id} part={value.name} exercises={value.exercises} />
      ))}
      <Total total={total}/>
    </div>
  )
}

const Total = ({total}) => {
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name}/>
      <Content parts={course.parts} />
    </>
  )
}

const App = () => {
  const courses = [
    {
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
  <>
    {courses.map(
      (course, index) => <Course key={index} course={course}/>
    )}
  </>
  )
}

export default App