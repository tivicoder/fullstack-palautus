const dummy = (dummy) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => { return sum + item.likes }, 0)
}

module.exports = {
  dummy,
  totalLikes
}
