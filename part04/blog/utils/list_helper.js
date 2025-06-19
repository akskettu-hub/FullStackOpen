const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((maxLikes, blog) => maxLikes.likes > blog.likes ? maxLikes : blog, -1)

}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}