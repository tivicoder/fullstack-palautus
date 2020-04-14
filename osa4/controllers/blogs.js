const blogsRouter = require('express').Router()
//const Blog = require('../models/blog')
const mongoose = require('mongoose')
const log = require('../utils/logger')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
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
