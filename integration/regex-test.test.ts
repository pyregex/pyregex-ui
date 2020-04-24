jest.setTimeout(30000)
describe('Regext Tests', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  it('opens the browser', async () => {
    await expect(page).toMatch('PyRegex')
  })

  describe('email regex test', () => {
    it('sends api call when all fields are valid', async () => {
      await page.type('#regex', '.+@.+\\..+')
      await page.type('#test-string', 'rodolfo.ueg@gmail.com')
      await page.click('#re-I')
      await page.click('#re-M')
      await page.$eval('#match-type', (el) => (el.value = 'search'))

      await jestPuppeteer.debug()
      await page.waitFor('#loading-indicator', { timeout: 400 })
    })
  })
})
