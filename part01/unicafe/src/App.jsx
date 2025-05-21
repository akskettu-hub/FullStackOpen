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

  const handleReset = () => {
  setGood(0)
  setNeutral(0)
  setBad(0)
  }

  return (
    <div>
      <Header text="give feeback"/>
      <Button onClick={() => setGood(good + 1)} text='good'/>
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral'/>
      <Button onClick={() => setBad(bad + 1)} text='bad'/>
            
      <Header text="statistics"/>
      <div> good {good}</div>
      <div> neutral {neutral}</div>
      <div> bad {bad}</div>      
    </div>
  )
}

//<Button onClick={handleReset} text='Reset'/>
export default App