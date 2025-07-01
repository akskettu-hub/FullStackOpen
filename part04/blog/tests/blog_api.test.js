const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('../utils/test_helper')

const api = supertest(app)



describe('api tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = testHelper.initalBlogs
            .map(blog => new Blog(blog))

        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

    test('all blog are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, testHelper.initalBlogs.length)
    })

    test('all blogs contain unique id property called id', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.every(blog => Object.hasOwn(blog, "id")), true)
        })

    test('A specific blog can be found with id', async () => {
        const blogs = await api.get('/api/blogs')
        const blogToView = blogs.body[0]
        const id = blogToView.id
    
        const response = await api.get(`/api/blogs/${id}`)
        
        assert.deepStrictEqual(response.body, blogToView)
    })

    describe('Adding a new note', () => {
        test('POST request succeeds with status code 201', async () => {
            const firstResponse = await api.get('/api/blogs')
            const initialBlogsLength = firstResponse.body.length
            const blogObject = testHelper.oneBlog

            await api
                .post('/api/blogs')
                .send(blogObject)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const secondResponse = await api.get('/api/blogs')
        
            assert.strictEqual(secondResponse.body.length, initialBlogsLength + 1)
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
    })

    describe('Deleting a blog', () => {
        test('DELETE request succesfully removes an existing post with status code 204', async ()=> {
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

        test('Deleting a blog with an invalid id fails with status code 400', async () => {
            await api
                .delete('/api/blogs/abcd1234')
                .expect(400)
        })

        test('Deleting a blog with a non-existent valid id fails with status code 404', async () => {
            await api
                .delete(`/api/blogs/${testHelper.nonExistingId}`)
                .expect(404)
        })
    })

    describe('Updating a blog', () => {
        test('Updating a blog succeeds with status code 200 with valid data', async () => {
            const blogsAtStart = await api.get('/api/blogs')
            const blogToUpdate = blogsAtStart.body[0]

            blogToUpdate.likes = 999

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(200)

            const responseUpdateBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)
            const updatedBlog = responseUpdateBlog.body

            assert.deepStrictEqual(blogToUpdate, updatedBlog)
        })

        test('Updating a blog fails with status code 400 with invalid data', async () => {
            const blogsAtStart = await api.get('/api/blogs')
            const blogToUpdate = blogsAtStart.body[0]

            blogToUpdate.likes = 'invalid data'

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
                .expect(400)
        })

        test('Updating a blog fails with status code 404 with invalid id', async () => {
            const blogsAtStart = await api.get('/api/blogs')
            const blogToUpdate = blogsAtStart.body[0]

            blogToUpdate.likes = 999

            await api
                .put(`/api/blogs/${testHelper.nonExistingId}`)
                .send(blogToUpdate)
                .expect(404)
        })
    })
})

describe('when there are two users in database initially', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(testHelper.initialUsers)
    })

    test('all users are returned with status code 200', async () => {
        const response = await api
            .get('/api/users')
            .expect(200)

        console.log(response.body)

        //console.log(response.status)
        
        assert.strictEqual(response.body.length, testHelper.initialUsers.length)
    })

    test('POST request succeed with status code 201', async () => {
        const newUser = {
            username: "aeket",
            name: "Akseli",
            password: "passoword123",
        }
        
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        //console.log(response.status)
        //console.log(response.body)
    })
})

after(async () => {
    await mongoose.connection.close()
})