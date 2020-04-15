const dummy = (blogs) => {
  blogs // to get rid of eslint warning
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => { return sum + item.likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let highest = blogs[0]
  for (let blog of blogs) {
    if (blog.likes > highest.likes) highest = blog
  }

  return { title: highest.title, author: highest.author, likes: highest.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  let blogCounts = {}
  for (let blog of blogs) {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
  }

  const authorWithMostBlogs = Object.keys(blogCounts).reduce((a, b) => blogCounts[a] > blogCounts[b] ? a : b)
  return {
    author: authorWithMostBlogs,
    blogs: blogCounts[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  let likeCounts = {}
  for (let blog of blogs) {
    likeCounts[blog.author] = (likeCounts[blog.author] || 0) + blog.likes
  }

  const authorWithMostLikes = Object.keys(likeCounts).reduce((a, b) => likeCounts[a] > likeCounts[b] ? a : b)
  return {
    author: authorWithMostLikes,
    likes: likeCounts[authorWithMostLikes]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
