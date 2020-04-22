import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import FormInput from './components/FormInput'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
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

  const blogFormRef = React.createRef()

  const addBlog = ({title, author, url }) => {
    blogService.create(title, author, url, user.data.token)
    .then(blog => {
      setBlogs(blogs.concat(blog))
      setTimedNotification(`a new blog ${title} by ${author} added`)
    })
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = (id) => {
    console.log('Blog liked, id: ', id)
    const blog = blogs.find(blog => blog.id === id)
    blogService
      .update(id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id })
      .then(updatedBlog => {
        console.log('updated likes: ', updatedBlog)
        setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
      })
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification.message} isError={notification.isError} />
      {user.data.name} logged in <button type="button" onClick={logoutClicked}>logout</button>
      <Togglable buttonLabel='new blog' ref={blogFormRef} >
        <NewBlogForm addBlog={addBlog} likeBlog={likeBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={id => likeBlog(blog.id)} />
      )}
    </div>
  )
}

export default App