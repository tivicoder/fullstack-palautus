import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


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
      }
    }
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
          />
        </div>
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
  return (
    <div>
      <h2>Blogs</h2>
      {user.data.name} logged in <button type="button" onClick={logoutClicked}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App