const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initalBlogs = [
    {
        title: "Gleaming the Cube",
        author: "Michael Trapezoid",
        url: "blog.com/cube_trapezoid",
        likes: 8,
    },
    {
        title: "Running Backend",
        author: "John James",
        url: "blog.com/running_backend_james",
        likes: 1,
    },
    {
        title: "Beans",
        author: "Gerals Garbanzo",
        url: "blog.com/beans",
        likes: 12,
    },
    {
        title: "More on Beans, by popular request",
        author: "Gerald Garbanzo",
        url: "blog.com/beans2",
        likes: 24,
    }
]

const oneBlog = {
    title: "Even more on beans. At this point, even I'm tired of writing about beans",
    author: "Gerald Garbanzo",
    url: "blog.com/beans2",
    likes: 12,
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initalBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('api tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

    test('all blog are returned', async () => {
        const response = await api.get('/api/blogs')
        //console.log(response.body)
        assert.strictEqual(response.body.length, initalBlogs.length)
    })

    test('all blogs contain unique id property called id', async () => {
        const response = await api.get('/api/blogs')
        console.log(response.body)
        assert.strictEqual(response.body.every(blog => Object.hasOwn(blog, "id")), true)
        })

    test('POST request successfully creates a new blog post', async () => {
        const blogObject = oneBlog
        console.log(blogObject)

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    after(async () => {
    await mongoose.connection.close()
    })
})