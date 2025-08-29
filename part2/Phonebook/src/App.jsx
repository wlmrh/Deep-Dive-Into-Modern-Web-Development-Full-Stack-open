import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    const newname = event.target.value
    setNewName(newname)
    console.log(newname)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setPersons([...persons, {name: newName}])
    console.log("Submitted")
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        (person, idx) => <div key={idx}>{person.name}</div>
      )}
    </div>
  )
}

export default App