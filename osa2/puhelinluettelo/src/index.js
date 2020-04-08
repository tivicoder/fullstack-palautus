import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const submitPressed = (event) => {
    event.preventDefault()
    if (persons.some((elem) => elem.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    setNewName("")
    setNewNumber("")

    axios
      .post("http://localhost:3001/persons", {name:newName, number:newNumber})
      .then(response => setPersons(persons.concat(response.data)))
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filter={filter} filterChangeHandler={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        submitPressed={submitPressed}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />

    </div>
  )
}

const Filter = ({filter, filterChangeHandler}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={filterChangeHandler} />
    </div>
  )
}

const PersonForm = ({submitPressed, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {
  return (
    <form onSubmit={submitPressed}>
      <div> name: <input value={newName} onChange={handleNewNameChange}/> </div>
      <div> number: <input value={newNumber} onChange={handleNewNumberChange} /></div>
      <div> <button type="submit">add</button> </div>
    </form>
  )
}

const Persons = ({persons, filter}) => {
  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <table>
      <tbody>
        {filteredPersons().map(elem =>
          <Person key={elem.name} name={elem.name} number={elem.number}/>)
        }
      </tbody>
    </table>
  )
}

const Person = ({name, number}) => {
  return (
    <tr>
      <td>{name}</td><td>{number}</td>
    </tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
