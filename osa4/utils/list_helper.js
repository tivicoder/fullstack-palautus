const dummy = (dummy) => {
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
