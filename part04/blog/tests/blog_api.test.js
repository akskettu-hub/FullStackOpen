const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = testHelper.initalBlogs
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
        assert.strictEqual(response.body.length, testHelper.initalBlogs.length)
    })

    test('all blogs contain unique id property called id', async () => {
        const response = await api.get('/api/blogs')
        //console.log(response.body)
        assert.strictEqual(response.body.every(blog => Object.hasOwn(blog, "id")), true)
        })

    test('POST request successfully creates a new blog post', async () => {
        const firstResponse = await api.get('/api/blogs')

        const initialBlogsLength = firstResponse.body.length

        const blogObject = testHelper.oneBlog
        //console.log(blogObject)

        await api
            .post('/api/blogs')
            .send(blogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const secondResponse = await api.get('/api/blogs')

        //console.log(secondResponse.body.length, initialBlogsLength + 1)
        //console.log(secondResponse.body);
    
        assert.strictEqual(secondResponse.body.length, initialBlogsLength + 1)
    })

    test('DELETE request succesfully removes an existing post', async ()=> {
        const blogsAtStart = await api.get('/api/blogs')

        const blogId = blogsAtStart.body[0].id

        await api
            .delete(`/api/blogs/${blogId}`)
            .expect(204)
        
        const blogsAtEnd = await api.get('/api/blogs')

        const idsAtEnd = blogsAtEnd.body.map(blog => blog.id)
        
        assert(!idsAtEnd.includes(blogId))

        assert.strictEqual(blogsAtStart.body.length - 1, blogsAtEnd.body.length)
    })

    test('If likes property is missing from post request, defaults to 0', async () => {
        const response = await api
            .post('/api/blogs')
            .send(testHelper.missingLikesBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('Missing title property returns 400', async () => {
        await api
            .post('/api/blogs')
            .send(testHelper.missingTitleBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Missing URL property returns 400', async () => {
        await api
            .post('/api/blogs')
            .send(testHelper.missingUrlBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    

    after(async () => {
    await mongoose.connection.close()
    })
})