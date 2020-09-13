import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      console.log('result.data: ', result.data)
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('blogapp-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }
  console.log('props.show: ', props.show)

  const submit = (event) => {
    event.preventDefault()
    console.log(`submit username:${username} password:${password}`)
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit} >
        <div>
        </div>
          name <input type='text' value={username} onChange={ ({ target }) => setUsername(target.value)} />
        <div>
          password <input type='password' value={password} onChange={ ({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login