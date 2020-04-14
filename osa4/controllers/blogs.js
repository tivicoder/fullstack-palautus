const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const log = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  log.info('getting all blogs: ')
  Blog
    .find({})
    .then(blogs => {
      log.info('done')
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  log.info('posting blog: ', blog)
  blog
    .save()
    .then(result => {
      log.info('done')
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
