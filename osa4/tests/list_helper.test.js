const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
} )

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.listWithManyBlogs)
    expect(result).toBe(36)
  })

} )

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('of a list with one blog returns the blog title, author and likes', () => {
    const blogs = helper.listWithOneBlog
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes
    })
  })

  test('of a list with many blogs returns the correct blog title, author and likes', () => {
    const blogs = helper.listWithManyBlogs
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: blogs[2].title,
      author: blogs[2].author,
      likes: blogs[2].likes
    })
  })
} )

describe('most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(null)
  })

  test('of a list with one blog returns the blog author and count 1', () => {
    const blogs = helper.listWithOneBlog
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: blogs[0].author,
      blogs: 1
    })
  })

  test('of a list with many blogs returns the correct blog author and count', () => {
    const result = listHelper.mostBlogs(helper.listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
} )

describe('most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(null)
  })

  test('of a list with one blog returns the blog author and like count', () => {
    const blogs = helper.listWithOneBlog
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: blogs[0].author,
      likes: 5
    })
  })

  test('of a list with many blogs returns the correct blog author and total like count', () => {
    const result = listHelper.mostLikes(helper.listWithManyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
} )
