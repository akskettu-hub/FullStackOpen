const Header = (props) => <h1>{props.course}</h1>

const Total = ({ parts }) => <b>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises.</b>

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

export default Course