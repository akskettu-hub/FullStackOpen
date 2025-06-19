const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const {info, error} = require('./utils/logger')
const blogsRouter = require('./controllers/blog') 

const app = express()

info('Connecting to MongoDB', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        info('Connected to MongoDB')
    })
    .catch((error) => {
        error('Error connecting to MongoDB', error)
    })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app