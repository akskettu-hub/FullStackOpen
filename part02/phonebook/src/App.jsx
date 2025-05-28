import { useState } from 'react'

const Entry = ({person}) => <p>{person.name} </p>

const Entries = ({persons}) => {
  return (
    <div>
      {persons.map(person => (<Entry key={person.name} person={person}/>))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  
  const addNewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName
    }

    if (persons.some(person => person.name === nameObject.name)) {
      console.log(`${nameObject.name} already in phonebook`);
      alert(`${nameObject.name} is already added to phonebook.`)
    } else {
      console.log(`${nameObject.name} not in phonebook`);
      setPersons(persons.concat(nameObject));
      setNewName('');
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Entries persons={persons} />
    </div>
  )
}

export default App