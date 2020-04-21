import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import FormInput from './components/FormInput'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState({ message:null, isError:false })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  const setTimedNotification = (message, isError) => {
    setNotification({message, isError})
    setTimeout(() => {
      setNotification({message:null, isError:false})
    }, 5000) 
  }

  if (user === null) {
    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
      const loginUser = await loginService.login({
        username, password,
      })

      if (loginUser) {
        setUser(loginUser)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginUser))
        setUsername('')
        setPassword('')
      } else {
        setTimedNotification('wrong username or password', true)
      }
    }
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} isError={notification.isError} />
        <form onSubmit={handleLogin}>
        <FormInput name="username" value={username} valueChanged={setUsername} />
        <FormInput name="password" value={password} valueChanged={setPassword} type="password" />
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  const logoutClicked = () => {
    console.log('clicked logout')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createClicked = (event) => {
    event.preventDefault()
    console.log(`createClicked: title:${title} author:${author} url:${url}`)
    blogService.create(title, author, url, user.data.token)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setTimedNotification(`a new blog ${title} by ${author} added`)
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification.message} isError={notification.isError} />
      {user.data.name} logged in <button type="button" onClick={logoutClicked}>logout</button>
      <h3>Create new</h3>
      <form onSubmit={createClicked}>
        <FormInput name="title" value={title} valueChanged={setTitle} />
        <FormInput name="author" value={author} valueChanged={setAuthor} />
        <FormInput name="url" value={url} valueChanged={setUrl} />
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App