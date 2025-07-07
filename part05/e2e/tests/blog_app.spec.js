const { describe, test, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

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
})
