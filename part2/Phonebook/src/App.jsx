import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456'}
  ]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
    const newPhone = event.target.value
    setNewPhone(newPhone)
    console.log(newPhone)
  }

  const handleSubmit1 = (event) => {
    event.preventDefault()
    const valid = persons.reduce(
      (accumulator, value) => (accumulator? value.name !== newName : false),
      true
    )

    if (!valid){
      alert(`${newName} is already added to the phonebook`)
      return
    }

    setPersons([...persons, {name: newName, phone: newPhone}])
    console.log("Submitted")
    setNewName('')
    setNewPhone('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit1}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handleChange1}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.filter(
          (person) => (person.name === filter || filter === '')
        )
        .map(
          (person, idx) => <div key={idx}>{person.name} {person.phone}</div>
        )
      }
    </div>
  )
}

export default App