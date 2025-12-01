import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly headerLocator: Locator
  readonly titleLocator: Locator
  readonly cityInputLocator: Locator
  readonly weatherListItemLocator: Locator
  readonly forecastSectionLocator: Locator
  readonly chartLocator: Locator
  readonly toggleButtonLocator: Locator
  readonly weatherHeadingText: (city: string, country: string) => Locator
  readonly loadingOverlayLocator: Locator

  constructor(page: Page) {
    this.page = page
    this.headerLocator = page.locator('header')
    this.titleLocator = page.getByText(/Nuxt4 Weather/i)
    this.cityInputLocator = page.getByPlaceholder('Select an city')
    this.weatherListItemLocator = page.locator('.weather-list-item').first()
    this.forecastSectionLocator = page.locator('section').filter({ has: page.locator('h3') }).first()
    this.chartLocator = page.locator('#fiveday-weather-forecast-chart')
    this.toggleButtonLocator = this.headerLocator.locator('button').first()
    this.weatherHeadingText = (city: string, country: string) =>
      page.getByText(new RegExp(`Weather in ${city}, ${country}`, 'i'))
    this.loadingOverlayLocator = page.locator('.fade-loading-enter-active, .fade-loading-enter-from, .fade-loading-leave-active')
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
  }

  async selectCity(cityName: string) {
    await this.cityInputLocator.click()
    await this.page.waitForFunction(() => document.querySelectorAll('ul li').length > 0)
    const option = this.page.locator('ul li', { hasText: new RegExp(cityName, 'i') }).first()
    await option.waitFor({ state: 'visible' })
    await option.click()
  }

  weatherHeading(city: string, country: string) {
    return this.weatherHeadingText(city, country)
  }

  async toggleDarkMode() {
    await this.toggleButtonLocator.click()
    await this.page.waitForFunction(() => document.documentElement.classList.contains('dark'))
  }

  async getHeaderBackgroundColor() {
    return this.headerLocator.evaluate(el => getComputedStyle(el).backgroundColor)
  }
}
