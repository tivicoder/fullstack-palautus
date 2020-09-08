import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBlog, increaseBlogLikes } from '../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.users.loggedUser)
  const history = useHistory()

  const id = useParams('id').id
  const blogs = useSelector(state => state.blogs)
  console.log('blogs: ', blogs)
  const blog = blogs.find(blog => blog.id === id)
  console.log('blog: ', blog)
  if (!blog) {
    return null
  }

  const removeBlog = () => {
    console.log('Remove blog clicked, id: ', id)
    const blog = blogs.find(blog => blog.id === id)
    console.log('blog creator: ', blog.user.name)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(id, loggedUser.token))
    }
    history.push('/blogs')
  }

  const likeBlog = () => {
    console.log('Like blog clicked, id: ', id)
    const updateBlog = blogs.find(blog => blog.id === id)
    dispatch(increaseBlogLikes(updateBlog))
  }

  const allowRemove = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    return blog.user.name === loggedUser.name
  }

  const removeBlogButtonStyle = {
    backgroundColor: 'dodgerblue',
    display: allowRemove(id) ? '' : 'none'
  }

  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button type='button' onClick={likeBlog}>like</button> </div>
      <div>added by {blog.user.name}</div>
      <div><button type='button' style={removeBlogButtonStyle} onClick={removeBlog}>remove</button></div>
      <h3>comments</h3>
      <ul>{[...blog.comments].map((comment, index) => <li key={index}>{comment}</li>)}</ul>
    </div>
  )
}

export default Blog
