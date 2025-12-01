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

  test('헤더와 도시 선택기 표시', async () => {
    await expect(homePage.titleLocator).toBeVisible()
    await expect(homePage.cityInputLocator).toBeVisible()
  })

  test('도시 선택 후 날씨 콘텐츠 렌더링', async () => {
    await homePage.selectCity('Tokusan-ri')
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible()
    await expect(homePage.weatherListItemLocator).toBeVisible()
    await expect(homePage.forecastSectionLocator).toBeVisible()
    await expect(homePage.chartLocator).toBeVisible()
  })

  test('다크모드 전환 및 헤더 색상 변경', async () => {
    const initialBg = await homePage.getHeaderBackgroundColor()
    await homePage.toggleDarkMode()
    const darkBg = await homePage.getHeaderBackgroundColor()
    expect(darkBg).not.toBe(initialBg)
  })

  test('지연 시 로딩 오버레이 표시 및 해제', async ({ page }) => {
    await page.unroute('**/weather')
    await page.unroute('**/forecast')
    await homePage.stubWeatherApis(
      new Promise(resolve => setTimeout(() => resolve(mockCurrentWeather), 800)),
      new Promise(resolve => setTimeout(() => resolve(mockFiveDayWeatherForecast), 800)),
    )

    await homePage.selectCity('Tokusan-ri')

    await expect(homePage.loadingOverlayLocator).toBeVisible()
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible()
    await expect(homePage.loadingOverlayLocator).toBeHidden()
  })

  test('새로고침 후 다크모드 유지', async ({ context, page }) => {
    await homePage.toggleDarkMode()
    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(page.locator('html')).toHaveClass(/dark/)

    // ensure data still renders after reload
    await homePage.selectCity('Tokusan-ri')
    await expect(homePage.weatherHeading('Tokusan-ri', 'KR')).toBeVisible()
  })
})
