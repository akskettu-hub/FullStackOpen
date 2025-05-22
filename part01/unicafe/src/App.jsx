import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const calculateAverage = (entries) => {
    if (entries.length === 0) {
      return 0;
    }

    const sum = entries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / entries.length
  }

const calculatePositives = (entries) => {
    if (entries.length === 0) {
      return 0;
    }

    const posCount= entries.filter(num => num > 0).length;
    return `${(posCount / entries.length) * 100} %`
  }

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = ({ entries, good, neutral, bad }) => {
  if (entries.length === 0) {
    return (
      <div>
      <Header text="statistics"/>
      <div> No feedback given </div>
    </div>
    )
  }
  return (
    <div>
      <Header text="statistics"/>

      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />

          <StatisticLine text="all" value ={entries.length} />
          <StatisticLine text="average" value ={calculateAverage(entries)} />
          <StatisticLine text="positive" value ={calculatePositives(entries)} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [entries, setEntries] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
        setEntries(entries.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setEntries(entries.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setEntries(entries.concat(-1))
  }

  return (
    <div>
      <Header text="give feeback"/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>

      <Statistics entries={entries} good={good} neutral={neutral} bad={bad}/>    
    </div>
  )
}

export default App