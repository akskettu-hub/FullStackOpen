const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password123'
      }
    })

    await page.goto('http://localhost:5173')

  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs App')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blogs App')).toBeVisible()
  })

  test('log in button is visible', async ({ page }) => {
    const locator = await page.getByRole('button', { name: 'log in ' })
    await expect(locator).toBeVisible()
  })

  test('Clicking log in button reveals log in form', async ({ page }) => {
    await page.getByRole('button', { name: 'log in ' }).click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  describe('Loging in ', () => {
    test('successfull with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'worngpassword')

      await expect(page.getByText('Wrong credentials')).toBeVisible()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in ', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password123')
      await page.getByText('Test User logged in').waitFor({ timeout: 5000 })
    })

    test('new blog form is not visible by default', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
    })

    test('new blog form fields and submit button are visible', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await expect(page.locator('#title-input')).toBeVisible()
      await expect(page.locator('#author-input')).toBeVisible()
      await expect(page.locator('#url-input')).toBeVisible()

      await expect(page.getByRole('button', { name: 'create' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
    })

    test('new blog can be created', async ({ page }) => {
      const newBlog = {
        title: 'example Blog',
        author: 'example Author',
        url: 'test.com/exampleBlog'
      }
      
      await createBlog(page, newBlog)

      const blogOnPage = await page.locator('.DetailsHidden')

      await expect(blogOnPage).toContainText(newBlog.title)
      await expect(blogOnPage).toBeVisible
    })

    test('blog can be liked', async ({ page }) => {
      const newBlog = {
        title: 'example Blog',
        author: 'example Author',
        url: 'test.com/exampleBlog'
      }
      
      await createBlog(page, newBlog)

      await page.getByRole('button', { name: 'view' }).click()
      const likesText = page.locator('.DetailsShown >> text=Likes:')
      await expect(likesText).toContainText('Likes: 0')
      
      await page.getByRole('button', { name: 'like' }).click()
      await expect(likesText).toContainText('Likes: 1')  
    })

    test('remove button can be seen by user who created the blog', async ({ page }) => {
      const newBlog = {
        title: 'example Blog',
        author: 'example Author',
        url: 'test.com/exampleBlog'
      }
      
      await createBlog(page, newBlog)

      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('a blog can be deleted by the user that created the blog', async ({ page }) => {
      const newBlog = {
        title: 'example Blog',
        author: 'example Author',
        url: 'test.com/exampleBlog'
      }
      
      await createBlog(page, newBlog)

      await page.getByRole('button', { name: 'view' }).click()

      page.on('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`)
        await dialog.accept()
      })

      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('Removed blog successfully')).toBeVisible()

      await expect(page.getByText(newBlog.title)).toHaveCount(0)
    })
  }) 
})
