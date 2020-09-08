import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action.data', action.data)

  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'ADD_BLOG': {
      const newBlog = action.data
      return state.concat(newBlog)
    }
    case 'REMOVE_BLOG': {
      const id = action.data
      return state.filter(blog => blog.id !== id)
    }
    case 'UPDATE_BLOG': {
      const updatedBlog = action.data
      return state.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
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
        type: 'INIT_BLOGS',
        data: blogs
      })
    )
  }
}

export const createBlog = (title, author, url, token) => {
  return async dispatch => {
    console.log('createBlog()')
    blogService.create(title, author, url, token)
      .then(blog => {
        dispatch({
          type: 'ADD_BLOG',
          data: blog
        })
        console.log('Added blog: ', blog)
      })
  }
}

export const increaseBlogLikes = (blog) => {
  return async dispatch => {
    blogService
      .update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id })
      .then(updatedBlog => {
        console.log('updated likes: ', updatedBlog)
        dispatch({
          type: 'UPDATE_BLOG',
          data: updatedBlog
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

export const addComment = (id, comment) => {
  return async dispatch => {
    console.log(`addComment(${id}, ${comment})`)
    blogService
      .comment(id, comment)
      .then(updatedBlog => {
        console.log('added comment: ', updatedBlog)
        dispatch({
          type: 'UPDATE_BLOG',
          data: updatedBlog
        })
      })
  }
}

export default reducer