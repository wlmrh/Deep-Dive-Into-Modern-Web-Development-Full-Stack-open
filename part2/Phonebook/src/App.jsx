import { useState, useEffect } from 'react'
import communicate from './services/communicate'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Alert from './components/Alert'
import Notification from './components/Notification'

const Persons = ({filter, persons, handleDelete}) => {
  console.log(persons)
  return (persons.filter(
      (person) => (person.name.toLowerCase() === filter.toLowerCase() || filter === '')
    )
    .map(
      (person, idx) => {
        return(
          <div key={idx} style={{display: 'flex'}}>
            <div>{person.name} {person.number}</div>
            <button name={person.name} onClick={handleDelete}>delete</button>
          </div>
        )
      }
    )
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [message1, setMessage1] = useState(null)
  useEffect(
    () => {
      communicate
        .getAll()
        .then(
          data => {
            setPersons(data)
          }
        )
    }, []
  )

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
    const repeat = persons.reduce(
      (accumulator, value) => {
        if (accumulator) return accumulator
        if (value.name == newName) accumulator = value.id
        return accumulator
      },
      0
    )

    if (!repeat){
      const newPersons = {name: newName, number: newNumber, id: persons[persons.length - 1].id + 1}
      communicate
        .create(newPersons)
        .then(
          rtn => {
            setPersons(persons.concat(rtn))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        )
        .catch(
          (error) => {
            setMessage(null)
            setMessage1(`Fail to add ${newName}.`)
            setTimeout(() => {
              setMessage1(null)
            }, 5000)
          }
        )
    }
    else if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
      const newPersons = {name: newName, number: newNumber, id: repeat}
      communicate
        .update(repeat, newPersons)
        .then(() =>{
            return communicate.getAll()
          }
        )
        .then(data => {
            setPersons(data)
            setMessage(`Modified ${newName}.`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        )
        .catch(
          (error) => {
            setMessage(null)
            setMessage1(`Information of ${newName} has already been removed from server.`)
            setTimeout(() => {
              setMessage1(null)
            }, 5000)
          }
        )
    }
    else{
      setMessage(null)
    }
  }

  const handleDelete = (event) => {
    const name = event.target.name
    const remove_id = persons.reduce(
      (accumulator, person) => {
        if (person.name == name){
          accumulator = person.id
        }
        return accumulator
      },
      -1
    )

    communicate
      .remove(remove_id)
      .then(() => {
        return communicate.getAll()
      })
      .then(data => {
        setPersons(data)
        setMessage(`Information of ${newName} has successfully been removed from server.`)
        setMessage1(null)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(null)
        setMessage1(`Information of ${newName} has already been removed from server.`)
        setTimeout(() => {
          setMessage1(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Alert message={message1}/>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChange1={handleChange1}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App