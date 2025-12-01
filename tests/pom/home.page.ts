import { expect, Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly headerLocator: Locator
  readonly titleLocator: Locator
  readonly cityInputLocator: Locator
  readonly weatherListItemLocator: Locator
  readonly forecastSectionLocator: Locator
  readonly chartLocator: Locator
  readonly toggleButtonLocator: Locator

  constructor(page: Page) {
    this.page = page
    this.headerLocator = page.locator('header')
    this.titleLocator = page.getByText(/Nuxt4 Weather/i)
    this.cityInputLocator = page.getByPlaceholder('Select an city')
    this.weatherListItemLocator = page.locator('.weather-list-item').first()
    this.forecastSectionLocator = page.locator('section').filter({ has: page.locator('h3') }).first()
    this.chartLocator = page.locator('#fiveday-weather-forecast-chart')
    this.toggleButtonLocator = this.headerLocator.locator('button').first()
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

  async expectHeaderAndSelectorVisible() {
    await expect(this.titleLocator).toBeVisible()
    await expect(this.cityInputLocator).toBeVisible()
  }

  async selectCity(cityName: string) {
    await this.cityInputLocator.click()
    await this.page.waitForTimeout(200)
    const option = this.page.locator('ul li', { hasText: new RegExp(cityName, 'i') }).first()
    await expect(option).toBeVisible({ timeout: 10_000 })
    await option.click()
  }

  async expectWeatherLoaded(city: string, country: string) {
    await expect(this.page.getByText(new RegExp(`Weather in ${city}, ${country}`, 'i'))).toBeVisible()
    await expect(this.weatherListItemLocator).toBeVisible({ timeout: 10_000 })
    await expect(this.forecastSectionLocator).toBeVisible({
      timeout: 15_000,
    })
    await expect(this.chartLocator).toBeVisible()
  }

  async toggleDarkModeAndGetHeaderColors() {
    await expect(this.toggleButtonLocator).toBeVisible()
    await expect(this.toggleButtonLocator).toBeEnabled()

    const initialBg = await this.headerLocator.evaluate(el => getComputedStyle(el).backgroundColor)

    await this.toggleButtonLocator.click()
    await expect.poll(async () => this.page.evaluate(() => document.documentElement.classList.contains('dark')), {
      timeout: 10_000,
    }).toBe(true)

    const darkBg = await this.headerLocator.evaluate(el => getComputedStyle(el).backgroundColor)
    return { initialBg, darkBg }
  }
}
