import { test, expect } from '@playwright/test'

test('RTK / RTKQ Interactions', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const counterValue = page.getByTestId('counter-value')
  expect(counterValue).toHaveText('0')

  const increment = page.getByRole('button', { name: 'Increment value' })
  await increment.click()

  expect(counterValue).toHaveText('1')

  const timeValue = page.getByTestId('time-value')
  await timeValue.getByText(/\d+:\d+:\d+ (A|P)M/).waitFor({ timeout: 2000 })

  const postValue = page.getByTestId('post-value')
  await postValue.getByText('A sample post').waitFor({ timeout: 2000 })

  // expect(timeValue).toHaveText(, {timeout: 5000, });
})
