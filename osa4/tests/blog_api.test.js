const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

let testUsers = []

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
    await Blog.deleteMany({})
  })

  test('adding one blog is successful', async () => {
    const blogsBefore = helper.listWithManyBlogs

    const token = await loginUser(testUsers[0])
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  })

  test('added blog has correct content', async () => {
    const token = await loginUser(testUsers[0])
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })

    const blogsAfter = await helper.blogsInDb()
    const addedBlog = blogsAfter.find(blog => blog.title === newBlog.title)

    expect(addedBlog).toBeDefined()
    expect(addedBlog.author).toBe(newBlog.author)
    expect(addedBlog.url).toBe(newBlog.url)
    expect(addedBlog.likes).toBe(newBlog.likes)
    expect(String(addedBlog.user)).toBe(String(testUsers[0].id))
    expect(Object.keys(addedBlog).length)
      .toBe(Object.keys(newBlog).length + 2) // including 'id' and 'user'
  })

  test('if likes is not provided it is set to 0', async () => {
    const newBlogWithoutLikes = { ...newBlog }
    delete newBlogWithoutLikes.likes

    const token = await loginUser(testUsers[0])
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .set({ Authorization: `bearer ${token}` })

    const blogsAfter = await helper.blogsInDb()
    const addedBlog = blogsAfter.find(blog => blog.title === newBlogWithoutLikes.title)

    expect(addedBlog.likes).toBe(0)
  })

  test('require title', async () => {
    const newBlogWithoutTitle = { ...newBlog }
    delete newBlogWithoutTitle.title

    const token = await loginUser(testUsers[0])
    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .set({ Authorization: `bearer ${token}` })
      .expect(400)
  })

  test('require url', async () => {
    const newBlogWithoutUrl = { ...newBlog }
    delete newBlogWithoutUrl.url

    const token = await loginUser(testUsers[0])
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .set({ Authorization: `bearer ${token}` })
      .expect(400)
  })

  test('post fails with error 401 if Authorization header not given', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('delete blogs', () => {
  test('delete returns success 204 and removes blog from database', async () => {
    // set all blogs to be created by testUsers[0]
    const blogsBefore =
      helper.listWithManyBlogs.map(blog => ({ ...blog, user: testUsers[0].id }))
    await Blog.insertMany(blogsBefore)

    // try to delete with testUsers[0] -> SUCCESS
    const blogToRemove = blogsBefore[1]
    const token = await loginUser(testUsers[0])
    await api
      .delete(`/api/blogs/${blogToRemove._id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204)
    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    expect(blogsAfter.find(blog => blog.id === blogToRemove._id)).toBeFalsy()
  })

  test('delete fails with error 403: not allowed', async () => {
    // set all blogs to be created by testUsers[0]
    const blogsBefore =
      helper.listWithManyBlogs.map(blog => ({ ...blog, user: testUsers[0].id }))
    await Blog.insertMany(blogsBefore)

    // try to delete with testUsers[1] -> FAIL
    const blogToRemove = blogsBefore[1]
    const token = await loginUser(testUsers[1])
    const response = await api
      .delete(`/api/blogs/${blogToRemove._id}`)
      .set({ Authorization: `bearer ${token}` })
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

beforeAll(async () => {
  await User.deleteMany({})

  // create 2 users for testing authentication
  testUsers[0] = await createUser({ username:'username1', name:'name1', password:'password1'})
  testUsers[0].password = 'password1'
  testUsers[1] = await createUser({ username:'username2', name:'name2', password:'password2'})
  testUsers[1].password = 'password2'
})

beforeEach(async () => {
  await Blog.deleteMany({})
})

afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close()
})

// return: created user
const createUser = async ({ username, name, password }) => {
  const response = await api
    .post('/api/users')
    .send({ username, name, password })
    .expect(200)
  return response.body
}

// return: user token
const loginUser = async (props) => {
  const response = await api
    .post('/api/login')
    .send({ username: props.username, password: props.password })
    .expect(200)
  return response.body.token
}
