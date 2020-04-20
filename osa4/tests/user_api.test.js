const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialUsers = helper.listWithManyUsers

describe('get users', () => {
  test('get all users succeeds and returns correct amount of users', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const users = response.body

    expect(users.length).toBe(initialUsers.length)
  })

  test('retrieved user contains correct properties and values', async () => {
    const response = await api.get('/api/users')

    const user1 = response.body[1]

    // expect object type: { username, name, id }
    expect(user1.username).toBe(initialUsers[1].username)
    expect(user1.name).toBe(initialUsers[1].name)
    expect(user1.id).toBeDefined()
    expect(user1.blogs).toBeDefined()
    expect(Object.keys(user1).length).toBe(4) // only above properties
  })
})

describe('post users', () => {
  test('adding new user succeeds', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'new username 1', name: 'new user 1', password: 'new password 1'
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
    expect(addedUser.blogs).toEqual([])
    expect(Object.keys(addedUser).length).toBe(4) // only above properties
  })

  test('too short username is rejected', async () => {
    const newUser = {
      username: 'ne',
      name: 'new user 1',
      password: 'new password 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error)
      .toMatch(/User validation failed: username.*is shorter than the minimum/)
  })

  test('too short password is rejected', async () => {
    const newUser = {
      username: 'new username 1',
      name: 'new user 1',
      password: 'ne'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error)
      .toMatch(/No password or too short password given/)
  })

  test('duplicate username is rejected', async () => {
    const newUser = {
      username: initialUsers[1].username,
      name: 'new user 1',
      password: 'new password 1'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(response.body.error)
      .toMatch(/User validation failed.*expected.*username.*to be unique/)
  })
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

afterAll(async () => {
  await User.deleteMany({})
  mongoose.connection.close()
})
