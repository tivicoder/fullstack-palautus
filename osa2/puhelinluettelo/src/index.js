import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import numberService from './services/numbers'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState({message:null, isError:false})

  const submitPressed = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((elem) => elem.name === newName)
    if (existingPerson){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        numberService
          .update(existingPerson.id, {...existingPerson, number:newNumber})
          .then(response => {
            setPersons(persons.map(person => person.id === existingPerson.id ? response.data : person))
            setNotification({message:`${newName}'s number changed to ${newNumber}`, isError:false})
            setTimeout(() => {
              setNotification({message:null, isError:false})
            }, 5000)
          })
          .catch(error => {
            setNotification({message:`${newName} was already removed from server`, isError:true})
            setTimeout(() => {
              setNotification({message:null, isError:false})
            }, 5000)
          })
      }
    } else {
      numberService
        .create(newName, newNumber)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification({message:`Added ${response.data.name}`, isError:false})
          setTimeout(() => {
            setNotification({message:null, isError:false})
          }, 5000)
      })
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
    const personName = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${personName} ?`)) {
      numberService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification({message:`Deleted ${personName}`, isError:false})
          setTimeout(() => {
            setNotification({message:null, isError:false})
          }, 5000)
        })
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
      <Notification message={notification.message} isError={notification.isError} />

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

const Notification = ({message, isError}) => {
  if (message === null) return null

  return (
    <div className={isError ? "error" : "success"}>
      {message} {isError}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
