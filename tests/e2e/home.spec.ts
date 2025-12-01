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

  test('shows and hides loading overlay when data is delayed', async ({ page }) => {
    await page.unroute('**/weather')
    await page.unroute('**/forecast')
    await homePage.stubWeatherApis(
      new Promise(resolve => setTimeout(() => resolve(mockCurrentWeather), 800)),
      new Promise(resolve => setTimeout(() => resolve(mockFiveDayWeatherForecast), 800)),
    )

    await homePage.selectCity('Tokusan-ri')

    const loadingOverlay = page.locator('.fade-loading-enter-active, .fade-loading-enter-from, .fade-loading-leave-active')
    await expect(loadingOverlay).toBeVisible()
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible({ timeout: 20_000 })
    await expect(loadingOverlay).toBeHidden()
  })

  test('persists dark mode after reload', async ({ context, page }) => {
    await homePage.toggleDarkMode()
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.locator('html')).toHaveClass(/dark/)

    // ensure data still renders after reload
    await homePage.selectCity('Tokusan-ri')
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible()
  })
})
