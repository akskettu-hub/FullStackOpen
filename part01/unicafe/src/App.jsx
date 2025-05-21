import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState([0])
  const [entries, setEntries] = useState([])

  const handleReset = () => {
  setGood(0)
  setNeutral(0)
  setBad(0)

  setAll(0)
  setEntries([])
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)

    setEntries(entries.concat(1))
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    
    setEntries(entries.concat(0))
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    
    setEntries(entries.concat(-1))
  }

  const calculateAverage = () => {
    if (entries.length === 0) {
      return 0;
    }

    const sum = entries.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / entries.length
  }

  const calculatePositives = () => {
    if (entries.length === 0) {
      return 0;
    }

    const posCount= entries.filter(num => num > 0).length;
    return (posCount / entries.length) * 100
  }

  //console.log(calculateAverage())
  //console.log(calculatePositives())

  return (
    <div>
      <Header text="give feeback"/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
            
      <Header text="statistics"/>
      <div> good {good}</div>
      <div> neutral {neutral}</div>
      <div> bad {bad}</div>

      <div> all {entries.length}</div>
      <div> average {calculateAverage()}</div>
      <div> positive {calculatePositives()} % </div>
      
      <Button onClick={handleReset} text='Reset'/>     
    </div>
  )
}

//<Button onClick={handleReset} text='Reset'/>
export default App