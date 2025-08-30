import { useState } from 'react'
const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, handleChange, newNumber, handleChange1}) => {
  return(
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleChange1}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Persons = ({filter, persons}) => {
  return (persons.filter(
      (person) => (person.name.toLowerCase() === filter.toLowerCase() || filter === '')
    )
    .map(
      (person, idx) => <div key={idx}>{person.name} {person.number}</div>
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilter = (event) => {
    const newFilter = event.target.value
    console.log(newFilter)
    setFilter(newFilter)
  }

  const handleChange = (event) => {
    const newname = event.target.value
    setNewName(newname)
  }

  const handleChange1 = (event) => {
    const newNumber = event.target.value
    setNewNumber(newNumber)
    console.log(newNumber)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const valid = persons.reduce(
      (accumulator, value) => (accumulator? value.name !== newName : false),
      true
    )

    if (!valid){
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setPersons([...persons, {name: newName, number: newNumber, id: persons[persons.length - 1].id + 1}])
    console.log("Submitted")
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChange1={handleChange1}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons}/>
    </div>
  )
}

export default App