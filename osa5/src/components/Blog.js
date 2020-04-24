import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, allowRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeBlogButtonStyle = {
    backgroundColor: 'dodgerblue',
    display: allowRemove() ? '' : 'none'
  }

  const [expanded, setExpanded] = useState(false)

  const viewClicked = () => {
    setExpanded(!expanded)
  }

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <label type='text' id='textbox_id' onClick={viewClicked}>{blog.title} </label>
      {blog.author}
      <button type='button' onClick={viewClicked}>{ expanded ? 'hide' : 'view' }</button>
      <div className='expanded' style={showWhenExpanded}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button type='button' onClick={likeBlog}>like</button> </div>
        <div>{blog.user.name}</div>
        <div><button type='button' style={removeBlogButtonStyle} onClick={removeBlog}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  allowRemove: PropTypes.func.isRequired,
}

export default Blog
