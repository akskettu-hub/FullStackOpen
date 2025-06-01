import { useState, useEffect } from 'react'
import numberService from './services/numbers'

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

const Entry = ({ person, onClick }) => {
  const handleDelete = () => onClick(person) 
  
  return (
    <p>{person.name} {person.number} <button onClick={handleDelete}>delete</button> </p>
  ) 
}

// Returns all entries that pass the filter. If filter is an empty string, all entries are returned. 
const Entries = ({ persons, filter, onClick }) => {
  return (
    <div>
      {persons
        .filter(person =>
          !filter || person.name.toLowerCase().includes(filter.toLowerCase()) 
        )
        .map(person => (
          <Entry key={person.name} person={person} onClick={onClick}/>
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
    numberService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    console.log('render', persons.length, 'notes')
  }, [])
  
  const addNewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === nameObject.name)) {
      console.log(`${nameObject.name} already in phonebook`)
      if (confirm(`${nameObject.name} is already added to phonebook. Replace old number with a new one?`)) {
        const id = persons.find(person => person.name === nameObject.name).id        
        numberService
          .update(id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id === id ? response.data : person))
            console.log(`Number for ${nameObject.name} (id:${id}) changed.`);
          })
      }
    } else {
      numberService
        .create(nameObject)
        .then(response => {
        setPersons(persons.concat(response.data))
        console.log(`Entry for ${nameObject.name} added to server.`);        
      })
    }
    setNewName('')
    setnewNumber('')
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

  const handleDeleteClick = (person) => {
    console.log(`delete clicked for ${person.id}`);

    if (confirm(`Delete ${person.name}?`)) {
      numberService
        .deleteEntry(person.id)
        .then(response => {
          setPersons(persons.filter((person) => person.id !== response.data.id))
          console.log(`Entry for ${person.name} (id:${person.id}) deleted from server`);
        })
    }
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
      <Entries persons={persons} filter={newFilter} onClick={handleDeleteClick}/>
    </div>
  )
}

export default App