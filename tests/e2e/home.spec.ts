import { test, expect } from '@playwright/test'
import { HomePage } from '../pom/home.page'
import { mockCurrentWeather, mockFiveDayWeatherForecast } from '../mock/home'

let homePage: HomePage

test.describe('home tests', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies()
    homePage = new HomePage(page)
    await homePage.stubWeatherApis(mockCurrentWeather, mockFiveDayWeatherForecast)
    await homePage.goto()
  })

  test('home renders header and city selector', async () => {
    await expect(homePage.titleLocator).toBeVisible()
    await expect(homePage.cityInputLocator).toBeVisible()
  })

  test('renders weather content after selecting a city', async () => {
    await homePage.selectCity('Tokusan-ri')
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible()
    await expect(homePage.weatherListItemLocator).toBeVisible({ timeout: 10_000 })
    await expect(homePage.forecastSectionLocator).toBeVisible({ timeout: 15_000 })
    await expect(homePage.chartLocator).toBeVisible()
  })

  test('toggles dark mode and updates header colors', async () => {
    const initialBg = await homePage.getHeaderBackgroundColor()
    await homePage.toggleDarkMode()
    const darkBg = await homePage.getHeaderBackgroundColor()
    expect(darkBg).not.toBe(initialBg)
  })
})
