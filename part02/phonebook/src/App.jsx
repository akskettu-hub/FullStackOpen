import { useState } from 'react'

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
        valueName={newName} 
        onChangeName={handleNameChange} 
        valueNumber={newNumber} 
        onChangeNumber={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Entries persons={persons} filter={newFilter}/>
    </div>
  )
}

export default App