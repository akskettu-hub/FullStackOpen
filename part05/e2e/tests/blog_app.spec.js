const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
    //await expect(locator).toBeVisible()
  })
})
