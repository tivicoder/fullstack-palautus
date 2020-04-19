const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const userId = getTokenUserIdFrom(request.body)
  if (!userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(userId)

  const blog = new Blog(request.body)
  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

const getTokenUserIdFrom = request => {
  // TODO: get rid of this test code
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_USER_ID // set in test code
  }

  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    return decodedToken.id
  }
  return null
}

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote.toJSON())
})

module.exports = blogsRouter
