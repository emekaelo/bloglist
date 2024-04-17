// @ts-check
const { test, expect } = require('@playwright/test')

test('can go to home page', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('React App')
})

test('Has Phonebook heading', async ({ page }) => {
  await page.goto('/')

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Phonebook' })).toBeVisible()
})

test('Has Numbers heading', async ({ page }) => {
  await page.goto('/')

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Numbers' })).toBeVisible()
})