import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const submitPressed = (event) => {
    event.preventDefault()
    if (persons.some((elem) => elem.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({name: newName, number: newNumber}))
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

  const filteredPersons = () => {
    return persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={submitPressed}>
        <div> name: <input value={newName} onChange={handleNewNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNewNumberChange} /></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredPersons().map(elem =>
            <tr key={elem.name}>
              <td>{elem.name}</td><td>{elem.number}</td> 
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)