import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const submitPressed = (event) => {
    event.preventDefault()
    // console.log('check if ', persons, 'contains ', {name: newName})
    if (persons.some((elem) => elem.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat({name: newName}))
    setNewName("")
  }

  const handleNewNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitPressed}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map(elem => <tr key={elem.name}><td>{elem.name}</td></tr>)}
        </tbody>
      </table>
    </div>
  )

}

export default App