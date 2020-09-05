import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action.data', action.data)

  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
    case 'REMOVE_BLOG': {
      const id = action.data
      return state.filter(blog => blog.id !== id)
    }
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    console.log('initBlogs()')
    blogService.getAll().then(blogs =>
      dispatch({
        type: 'SET_BLOGS',
        data: blogs
      })
    )
  }
}

export const createBlog = (blogs, title, author, url, token) => {
  return async dispatch => {
    console.log('createBlog()')
    blogService.create(title, author, url, token)
      .then(blog => {
        dispatch({
          type: 'SET_BLOGS',
          data: blogs.concat(blog)
        })
        console.log('Added blog: ', blog)
      })
  }
}

export const increaseBlogLikes = (blogs, id) => {
  return async dispatch => {
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
        dispatch({
          type: 'SET_BLOGS',
          data: blogs.map(blog => blog.id === id ? updatedBlog : blog)
        })
      })

  }
}

export const deleteBlog = (id, token) => {
  return async dispatch => {
    blogService
      .remove(id, token)
      .then((blogs) => {
        console.log('removed, blogs ', blogs)
        dispatch({
          type: 'REMOVE_BLOG',
          data: id
        })
      })

  }
}

export default reducer