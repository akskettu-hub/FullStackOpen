const express = require('express')
const mongoose = require('mongoose')

const Blog = require('./models/blog')
const config = require('./utils/config')
const {info, error} = require('./utils/logger')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info('Connected to MongoDB')
    })
    .catch(error => {
        error('Error connecting to MongoDB', error)
    })

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
    const body = request.body
    info(body)

    const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`)
})