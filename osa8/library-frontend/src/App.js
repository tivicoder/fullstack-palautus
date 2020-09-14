
import React, { useEffect, useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
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

  const notify = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() => {
    console.log('using effect')
    setToken(localStorage.getItem('bookapp-user-token'))
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('adding book to cache:', addedBook)
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
      notify(`New book added: ${addedBook.title} by ${addedBook.author.name}`)
    }
  })

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
      <div style={{ color: 'green' }}>
        {notification}
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