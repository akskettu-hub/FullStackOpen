const Header = ({course}) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exer}</p>
  )
}

const Content = ({parts}) => {
  console.log(parts)
  console.log(parts[0])
  console.log(parts[0].name)

  return (
    <div>
      <Part name={parts[0].name} exer={parts[0].exercises}/>
      <Part name={parts[1].name} exer={parts[1].exercises}/>
      <Part name={parts[2].name} exer={parts[2].exercises}/>
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
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
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}
// <Total parts={parts} />
export default App