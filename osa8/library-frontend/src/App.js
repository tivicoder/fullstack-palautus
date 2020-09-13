
import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const client = useApolloClient()

  const logout = (event) => {
    event.preventDefault()
    console.log('logout')
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const setTokenAndPage = (token) => {
    console.log('setting token:', token)
    setToken(token)
    setPage('authors')
  }

  const setLoginError = (error) => {
    setError(error)
    setTimeout(() => setError(null), 5000)
  }

  useEffect(() => {
    console.log('using effect')
    setToken(localStorage.getItem('bookapp-user-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick= {() => setPage('recommend')}>recommend</button> }
        { token
          ? <button onClick={ logout }>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <div style={{ color: 'red' }}>
        {error}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
      />

      <Login
        show={page === 'login'}
        setToken={ (token) => setTokenAndPage(token)}
        setError={ (error) => setLoginError(error)}
      />
    </div>
  )
}

export default App