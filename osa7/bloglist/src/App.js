import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogListItem from './components/BlogListItem'
import FormInput from './components/FormInput'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import loginService from './services/login'
import { useSelector, useDispatch } from 'react-redux'
import { setTimedNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogsReducer'
import { initUsers, setLoggedUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initBlogs())

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(loggedUser))
      console.log('user: ', loggedUser)
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch, blogs])

  if (users.loggedUser === null) {
    const handleLogin = async (event) => {
      event.preventDefault()
      console.log('logging in with', username, password)
      const loginUser = await loginService.login({
        username, password,
      })

      if (loginUser) {
        dispatch(setLoggedUser(loginUser))
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loginUser))
        setUsername('')
        setPassword('')
      } else {
        dispatch(setTimedNotification('wrong username or password', true))
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
    dispatch(setLoggedUser(null))
  }

  const blogFormRef = React.createRef()

  const addBlog = ({ title, author, url }) => {
    dispatch(createBlog(title, author, url, users.loggedUser.token))
    dispatch(setTimedNotification(`a new blog ${title} by ${author} added`))
    blogFormRef.current.toggleVisibility()
  }

  const logoutButtonStyle = {
    backgroundColor: 'white',
    margin: 5
  }

  const navigationBannerStyle = {
    backgroundColor: 'lightgrey'
  }

  return (
    <div>
      <Router>
        <div style={navigationBannerStyle}>
          <Link style={{ padding: 5 }} to="/blogs">blogs</Link>
          <Link style={{ padding: 5 }} to="/users">users</Link>
          {users.loggedUser.name} logged in
          <button type="button" style={logoutButtonStyle} onClick={logoutClicked}>logout</button>
        </div>
        <h2>blog app</h2>
        <Notification message={notification.message} isError={notification.isError} />
        <Switch>
          <Route path='/blogs/:id'>
            <Blog />
          </Route>
          <Route path='/blogs'>
            <Togglable buttonLabel='create new' ref={blogFormRef} >
              <NewBlogForm addBlog={addBlog} />
            </Togglable>
            {[...blogs]
              .sort((a,b) => b.likes - a.likes)
              .map(blog => <BlogListItem key={blog.id} id={blog.id} title={blog.title} />)
            }
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <Users/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App