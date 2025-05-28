import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => <div>filter shown with: <input value={value} onChange={onChange}/></div>

const PersonForm = ({ onSubmit, nameProps, numberProps }) => {
  return (
    <form onSubmit={onSubmit}>
        <div>name: <input {...nameProps}/></div>
        <div>number: <input {...numberProps}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')

  useEffect(() => {
    console.log("effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')
  
  
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
      <Filter value={newFilter} onChange={handleFilterChange}/>

      <h3>Add a new number</h3>
      <PersonForm 
        onSubmit={addNewName}
        nameProps={{
          value: newName,
          onChange: handleNameChange
        }}
        numberProps={{
          value: newNumber,
          onChange: handleNumberChange
        }}
      />
      
      <h3>Numbers</h3>
      <Entries persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App