const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('get users', () => {
  test('get all users succeeds and returns correct amount of users', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const users = response.body

    expect(users.length).toBe(listWithManyUsers.length)
  })

  test('retrieved user contains correct properties and values', async () => {
    const response = await api.get('/api/users')

    const user1 = response.body[1]

    // expect object type: { username, name, id }
    expect(user1.username).toBe(listWithManyUsers[1].username)
    expect(user1.name).toBe(listWithManyUsers[1].name)
    expect(user1.id).toBeDefined()
    expect(Object.keys(user1).length).toBe(3) // only above properties
  })
})

describe('post users', () => {
  test('adding new user succeeds', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'new username 1',
      name: 'new user 1',
      password: 'new password 1',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(usersBefore.length + 1)

    const addedUser = usersAfter.find(user => user.username === newUser.username)
    expect(addedUser).toBeDefined
    expect(addedUser.name).toBe(newUser.name)
    expect(addedUser.id).toBeDefined()
    expect(Object.keys(addedUser).length).toBe(3) // only above properties
  })
})

const listWithManyUsers = [
  { username: 'test username1', name: 'test user1', passwordHash: 'test passwordhash1' },
  { username: 'test username2', name: 'test user2', passwordHash: 'test passwordhash2' },
  { username: 'test username3', name: 'test user3', passwordHash: 'test passwordhash3' }
]

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(listWithManyUsers)
})

afterAll(() => {
  mongoose.connection.close()
})
