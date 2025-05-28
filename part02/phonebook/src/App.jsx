import { useState } from 'react'

const Entry = ({person}) => <p>{person.name} {person.number}</p>

// Returns all entries that pass the filter. If filter is an empty string, all entries are returned. 
const Entries = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter(person =>
          !filter || person.name.toLowerCase().includes(filter.toLowerCase()) 
        )
        .map(person => (
          <Entry key={person.name} person={person}/>
        ))
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  
  const addNewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === nameObject.name)) {
      console.log(`${nameObject.name} already in phonebook`)
      alert(`${nameObject.name} is already added to phonebook.`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setnewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setnewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setnewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with: <input value={newFilter} onChange={handleFilterChange}/></div>
      <h2>Add a new number</h2>
      <form onSubmit={addNewName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entries persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App