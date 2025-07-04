const { describe, test, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    const locator = await page.getByText('Blogs App')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blogs App')).toBeVisible()
  })
})
