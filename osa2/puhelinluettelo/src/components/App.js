import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: '040-1231244'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const submitPressed = (event) => {
    event.preventDefault()
    // console.log('check if ', persons, 'contains ', {name: newName})
    if (persons.some((elem) => elem.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName("")
    setNewNumber("")
  }

  const handleNewNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPressed}>
        <div> name: <input value={newName} onChange={handleNewNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNewNumberChange} /></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(elem =>
            <tr key={elem.name}>
              <td>{elem.name}</td><td>{elem.number}</td> 
            </tr>)}
        </tbody>
      </table>
    </div>
  )

}

export default App