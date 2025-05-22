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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotesIndex, setMostVotes] = useState(0)
  
  console.log(votes)
  console.log(Math.max(...votes))
  console.log(votes.indexOf(Math.max(...votes)))

  const handleNextClicked = () => {
    console.log("clicked next")
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVotesClicked = () => {
    console.log("clicked votes")
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    setMostVotes(copy.indexOf(Math.max(...copy)))
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <div>{anecdotes[selected]}</div>
      <div> has {votes[selected]} votes</div>
      <div>
        <Button onClick={handleVotesClicked} text='vote'/>
        <Button onClick={handleNextClicked} text='next anecdote'/>
        </div>
      <Header text="Anecdote with most votes"/>
      <div> {anecdotes[mostVotesIndex]}</div>
      <div> has {votes[mostVotesIndex]} votes</div>
    </div>
  )
}

export default App
