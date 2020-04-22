import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)

  const viewClicked = (event) => {
    setExpanded(!expanded)
  }

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <label type='text' id='textbox_id' onClick={viewClicked}>{blog.title} </label>
      {blog.author}
      <button type='button' onClick={viewClicked}>{ expanded ? 'hide' : 'view' }</button>
      <div style={showWhenExpanded}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button type='button' onClick={likeBlog}>like</button> </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
