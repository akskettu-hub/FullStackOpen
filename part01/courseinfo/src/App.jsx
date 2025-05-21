const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exer}</p>
  )
}

const Content = (props) => {
  console.log(props)
  console.log(props.part1.name)
  return (
    <div>
      <Part name={props.part1.name} exer={props.part1.exercises}/>
      <Part name={props.part2.name} exer={props.part2.exercises}/>
      <Part name={props.part3.name} exer={props.part3.exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.part1.exercises + props.part2.exercises + props.part3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
}

export default App