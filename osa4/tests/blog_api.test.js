const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs is returned', async () => {
    const response =  await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('a specific blog is among the returned blogs', async () => {
    const response =  await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('TDD harms architecture')
  })

  test('expect response to have ID property', async () => {
    const response =  await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('post', () => {
  const newBlog = {
    'title': 'unittest title 6489',
    'author': 'unittest author 6489',
    'url': 'unittest url 6489',
    'likes': 32
  }

  test('adding one blog is successful', async () => {
    const blogsBefore = helper.listWithManyBlogs
    await api.post('/api/blogs').send(newBlog)
      .expect(201)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  })

  test('added blog has correct content', async () => {
    await api.post('/api/blogs').send(newBlog)
    const blogsAfter = await helper.blogsInDb()
    const addedBlog = blogsAfter.find(blog => blog.title === newBlog.title)

    expect(addedBlog).toBeDefined()
    expect(addedBlog.author).toBe(newBlog.author)
    expect(addedBlog.url).toBe(newBlog.url)
    expect(addedBlog.likes).toBe(newBlog.likes)
    expect(Object.keys(addedBlog).length).toBe(Object.keys(newBlog).length + 1) // including 'id'
  })

  test('if likes is not provided it is set to 0', async () => {
    const newBlogWithoutLikes = { ...newBlog }
    delete newBlogWithoutLikes.likes

    await api.post('/api/blogs').send(newBlogWithoutLikes)
    const blogsAfter = await helper.blogsInDb()
    const addedBlog = blogsAfter.find(blog => blog.title === newBlogWithoutLikes.title)

    expect(addedBlog.likes).toBe(0)
  })

  test('require title', async () => {
    const newBlogWithoutTitle = { ...newBlog }
    delete newBlogWithoutTitle.title

    await api.post('/api/blogs').send(newBlogWithoutTitle)
      .expect(400)
  })

  test('require url', async () => {
    const newBlogWithoutUrl = { ...newBlog }
    delete newBlogWithoutUrl.url

    await api.post('/api/blogs').send(newBlogWithoutUrl)
      .expect(400)
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})
