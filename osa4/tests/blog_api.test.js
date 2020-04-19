const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await Blog.insertMany(helper.listWithManyBlogs)
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('correct amount of blogs is returned', async () => {
    await Blog.insertMany(helper.listWithManyBlogs)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length)
  })

  test('a specific blog is among the returned blogs', async () => {
    await Blog.insertMany(helper.listWithManyBlogs)
    const response =  await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('TDD harms architecture')
  })

  test('expect response to have ID property', async () => {
    await Blog.insertMany(helper.listWithManyBlogs)
    const response =  await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('post blogs', () => {
  const newBlog = {
    'title': 'unittest title 6489',
    'author': 'unittest author 6489',
    'url': 'unittest url 6489',
    'likes': 32
  }

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.listWithManyBlogs)
  })

  afterAll(async () => {
    await User.deleteMany({})
  })

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
    expect(String(addedBlog.user)).toBe(allowedUserId)
    expect(Object.keys(addedBlog).length)
      .toBe(Object.keys(newBlog).length + 2) // including 'id' and 'user'
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

describe('delete blogs', () => {
  test('delete returns success 204 and removes blog from database', async () => {
    const blogsBefore =
      helper.listWithManyBlogs.map(blog => ({ ...blog, user: allowedUserId }))
    await Blog.insertMany(blogsBefore)

    const blogToRemove = blogsBefore[1]
    await api.delete(`/api/blogs/${blogToRemove._id}`)
      .expect(204)
    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    expect(blogsAfter.find(blog => blog.id === blogToRemove._id)).toBeFalsy()
  })

  test('delete fails with error 403: not allowed', async () => {
    const blogsBefore =
      helper.listWithManyBlogs.map(blog => ({ ...blog, user: disallowedUserId }))
    await Blog.insertMany(blogsBefore)

    const blogToRemove = blogsBefore[1]
    const response = await api.delete(`/api/blogs/${blogToRemove._id}`)
      .expect(403)
    expect(response.body.error)
      .toMatch(/not allowed to remove blog/)

    // check that blog is still there
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
    expect(blogsAfter.find(blog => blog.id === blogToRemove._id)).toBeDefined()
  })
})

describe('update blogs', () => {
  const newBlog = {
    'title': 'updated title',
    'author': 'updated author',
    'url': 'updated url',
    'likes': 532
  }

  test('update returns success 200 and updates properties', async () => {
    const blogsBefore = helper.listWithManyBlogs
    await Blog.insertMany(blogsBefore)

    const idToUpdate = blogsBefore[3]._id
    await api.put(`/api/blogs/${idToUpdate}`)
      .send(newBlog)
      .expect(200)

    const blogsAfter = await helper.blogsInDb()
    const updatedBlog = blogsAfter.find(blog => blog.id === idToUpdate)

    expect(updatedBlog).toBeDefined()
    expect(updatedBlog.author).toBe(newBlog.author)
    expect(updatedBlog.url).toBe(newBlog.url)
    expect(updatedBlog.likes).toBe(newBlog.likes)
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

let allowedUserId
let disallowedUserId

beforeAll(async () => {
  await User.deleteMany({})

  // create 2 users for testing authentication
  allowedUserId = String((await User.create({ username: 'dummy allowed username' }))._id)
  disallowedUserId = String((await User.create({ username: 'dummy disallowed username' }))._id)

  // GLOBAL VARIABLE is read in blogs.js for successful authentication
  process.env.TEST_USER_ID = allowedUserId
})

beforeEach(async () => {
  await Blog.deleteMany({})
})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  delete process.env.TEST_USER_ID
  mongoose.connection.close()
})
