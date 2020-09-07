import React from 'react'
import { Link } from 'react-router-dom'

const BlogListItem = ({ id, title }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <Link to={`/blogs/${id}`} >{title}</Link>
    </div>
  )
}

export default BlogListItem