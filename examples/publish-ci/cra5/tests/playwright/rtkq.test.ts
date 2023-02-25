import { test, expect } from '@playwright/test'
import { format } from 'prettier'

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

test('RTK / RTKQ Interactions', async ({ page }) => {
  await page.goto('http://localhost:3000')

  const counterValue = page.getByTestId('counter-value')
  const counterText = await counterValue.innerText({ timeout: 0 })
  expect(counterText).toBe('0')

  const increment = page.getByRole('button', { name: 'Increment value' })
  await increment.click()

  const counterText2 = await counterValue.innerText({ timeout: 0 })
  expect(counterText2).toBe('1')

  console.log('CounterText2: ', counterText2)

  // expect(counterValue).toHaveText('1')

  async function logHTML(message = '') {
    const html = await page.innerHTML('div#root')
    const formattedHTML = format(html, { parser: 'html' })
    console.log(message, formattedHTML)
  }

  logHTML('Page: ')

  const timeValue = page.getByTestId('time-value')
  const postValue = page.getByTestId('post-value')

  await expect(timeValue).toHaveText(/\d+:\d+:\d+\s+(A|P)M/, { timeout: 10000 })
  await expect(postValue).toHaveText('A sample post', { timeout: 10000 })

  // console.log('timeValue before: ', await timeValue.innerText())
  // console.log('postValue before: ', await postValue.innerText())
  // await delay(5000)

  // console.log('timeValue after: ', await timeValue.innerText())
  // console.log('postValue after: ', await postValue.innerText())
  //
  // await page.getByText(/\d+:\d+:\d+ (A|P)M/).waitFor({ timeout: 10000 })

  //
  //
  // await page.getByText('A sample post').waitFor({ timeout: 10000 })

  // try {
  // } catch (err) {
  // } finally {
  //   logHTML('After timevalue')
  // }

  // try {
  // } catch (err) {
  // } finally {
  //   logHTML('After postvalue')
  // }
})
