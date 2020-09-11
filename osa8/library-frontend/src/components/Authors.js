import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 } )
  const [editAuthor] = useMutation(UPDATE_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return(
      <div> loading </div>
    )
  }

  const authors = result.data.allAuthors
  const authorOptions = authors.map(author => ({ value: author.name, label: author.name }))

  const onSubmit = (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birth year</h3>
      <form onSubmit={onSubmit}>
        <Select
          defaultValue={authorOptions[0]}
          onChange={(option) => setName(option.value)}
          options={authorOptions}
        />
        <div>
          born <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
