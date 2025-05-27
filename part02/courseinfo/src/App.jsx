const Header = (props) => <h1>{props.course}</h1>

const Total = ({ parts }) => <b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>

const Content = ({ parts }) => {
  console.log("parts object passed to Content", parts)
  return (
    <div> 
      {parts.map(part => (
        <Part part={part}/>
      ))} 
    </div>
    )
  }

const Part = ({ part }) => {
  console.log("part print:", part)
  return (
    <p key={part.id}>{part.name} {part.exercises}</p>
  )
}

const Course = (props) => {
  console.log(props.course)
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
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
  
  return (
    <div>
      {courses.map(course => <Course course={course} />)}
    </div>
  )
}

export default App