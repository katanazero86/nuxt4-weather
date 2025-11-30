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
    await homePage.expectHeaderAndSelectorVisible()
  })

  test('renders weather content after selecting a city', async () => {
    await homePage.selectCity('Tokusan-ri')
    await homePage.expectWeatherLoaded('Tokusan-ri', 'KR')
  })

  test('toggles dark mode and updates header colors', async () => {
    const { initialBg, darkBg } = await homePage.toggleDarkModeAndGetHeaderColors()
    expect(darkBg).not.toBe(initialBg)
  })
})
