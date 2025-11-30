import { expect, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async stubWeatherApis(currentWeather: unknown, fiveDayForecast: unknown) {
    await this.page.route('**/weather', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(currentWeather),
      }),
    )
    await this.page.route('**/forecast', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(fiveDayForecast),
      }),
    )
  }

  async goto() {
    await this.page.goto('/')
    await this.page.waitForLoadState('networkidle')
    await this.page.waitForTimeout(200)
  }

  header() {
    return this.page.locator('header')
  }

  cityInput() {
    return this.page.getByPlaceholder('Select an city')
  }

  async expectHeaderAndSelectorVisible() {
    await expect(this.page.getByText('Nuxt4 Weather')).toBeVisible()
    await expect(this.cityInput()).toBeVisible()
  }

  async selectCity(cityName: string) {
    await this.cityInput().click()
    await this.page.waitForTimeout(200)
    const option = this.page.locator('ul li', { hasText: cityName }).first()
    await expect(option).toBeVisible({ timeout: 10_000 })
    await option.click()
  }

  async expectWeatherLoaded(city: string, country: string) {
    await expect(this.page.getByText(`Weather in ${city}, ${country}`)).toBeVisible()
    await expect(this.page.locator('.weather-list-item').first()).toBeVisible({ timeout: 10_000 })
    await expect(this.page.locator('section').filter({ has: this.page.locator('h3') }).first()).toBeVisible({
      timeout: 15_000,
    })
    await expect(this.page.locator('#fiveday-weather-forecast-chart')).toBeVisible()
  }

  async toggleDarkModeAndGetHeaderColors() {
    const header = this.header()
    const toggleButton = header.locator('button').first()
    await expect(toggleButton).toBeVisible()
    await expect(toggleButton).toBeEnabled()

    const initialBg = await header.evaluate(el => getComputedStyle(el).backgroundColor)

    await toggleButton.click()
    await expect.poll(async () => this.page.evaluate(() => document.documentElement.classList.contains('dark')), {
      timeout: 10_000,
    }).toBe(true)

    const darkBg = await header.evaluate(el => getComputedStyle(el).backgroundColor)
    return { initialBg, darkBg }
  }
}
