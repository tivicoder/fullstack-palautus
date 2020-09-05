import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action.data', action.data)

  switch (action.type) {
    case 'SET_BLOGS':
      return action.data
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

export default reducer