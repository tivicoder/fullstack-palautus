import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import numberService from './services/numbers'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const submitPressed = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((elem) => elem.name === newName)
    if (existingPerson){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        numberService
          .update(existingPerson.id, {...existingPerson, number:newNumber})
          .then(response =>
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person)))
      }
    } else {
      numberService
        .create(newName, newNumber)
        .then(response => setPersons(persons.concat(response.data)))
    }
    setNewName("")
    setNewNumber("")
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

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name} ?`)) {
      numberService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  useEffect(() => {
    numberService
      .getAll()
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
      <Persons persons={persons} filter={filter} removePerson={removePerson} />

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

const Persons = ({persons, filter, removePerson}) => {
  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <table>
      <tbody>
        {filteredPersons().map(elem =>
          <Person key={elem.name}
                  name={elem.name}
                  number={elem.number}
                  removePerson={() => removePerson(elem.id)}/>)
        }
      </tbody>
    </table>
  )
}

const Person = ({name, number, removePerson}) => {
  return (
    <tr>
      <td>{name}</td><td>{number}<button onClick={removePerson}>delete</button></td>
    </tr>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
