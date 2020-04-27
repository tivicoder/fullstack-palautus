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
  const userId = getUserIdInTokenFrom(request.body)
  if (!userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(userId)

  const blog = new Blog(request.body)
  blog.user = user

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

const getUserIdInTokenFrom = request => {
  const token = request.token
  if (!token) {
    return null
  }

  return jwt.verify(token, process.env.SECRET).id
}

blogsRouter.delete('/:id', async (request, response) => {
  const userId = getUserIdInTokenFrom(request.body)
  if (!userId) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog && blog.user.toString() === userId.toString()) {
    await blog.remove()
    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'not allowed to remove blog' })
  }
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
