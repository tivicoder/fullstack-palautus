import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams('id').id
  const users = useSelector(state => state.users).allUsers
  console.log('users: ', users)
  const user = users.find(user => user.id === id)
  console.log('user: ', user)
  if (!user) {
    return null
  }
  return(
    <div>
      <h2>{user.username}</h2>
      <h3>
        added blogs
      </h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.title}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User