<script setup lang="ts">
import { useCurrentWeather, useFiveDayWeatherForecast } from "~/composable/apis/useOpenWeather";

import { useSelectedCity } from "~/composable/useWeather";
import CurrentWeather from "~/components/weather/currentWeather/CurrentWeather.vue";
import FiveDayWeatherForecast from "~/components/weather/fiveDayWeatherForecast/FiveDayWeatherForecast.vue";
import FiveDayWeatherForecastChart
  from "~/components/weather/fiveDayWeatherForecastChart/FiveDayWeatherForecastChart.vue";


const selectedCity = useSelectedCity()
const {
  data: currentWeather,
  status: currentWeatherStatus,
  execute: currentWeatherExecute,
  refresh: currentWeatherRefresh,
  pending: currentWeatherPending,
  error: currentWeatherError
} = useCurrentWeather(selectedCity)

const {
  data: fiveDayWeatherForecast,
  status: fiveDayWeatherForecastStatus,
  execute: fiveDayWeatherForecastExecute,
  refresh: fiveDayWeatherForecastRefresh,
  pending: fiveDayWeatherForecastPending,
  error: fiveDayWeatherForecastError
} = useFiveDayWeatherForecast(selectedCity)

// const { data, status, pending, error, execute } = useFetch<WeatherData>(() => {
//   if (selectedCity.value === null) return ''
//   return 'https://api.openweathermap.org/data/2.5/weather'
// }, {
//   immediate: false,
//   query: computed(() => ({
//     lat: selectedCity.value?.coord.lat,
//     lon: selectedCity.value?.coord.lon,
//     appid: ''
//   })),
//   watch: [selectedCity],
//   onResponseError: (error) => {
//     console.error('Error fetching weather data:', error)
//   }
// })

// 이렇게 작성하면 안됌 => setup() 실행 시점에 한번만 평가 되어짐
// if(status.value === 'error') {
//   console.log('zz')
//   throw createError({
//     statusCode: 401,
//     data: {
//       cod: 401,
//       message: 'Unauthorized'
//     }
//   })
// }

// 이건 동작
// onMounted(() => {
//   throw createError({
//     statusCode: 401,
//     message: 'Unauthorized',
//     data: {
//       cod: 401,
//       message: 'Unauthorized'
//     }
//   })
// })

watchEffect(() => {
  if (currentWeatherStatus.value === 'error') {

    // 리액티브 변화에 따라 트리거가 되는데, 이 시점이 불분명 하여 페이지 전환이 되지 않음.
    // throw createError({
    //   statusCode: 401,
    //   data: {
    //     cod: 401,
    //     message: 'Unauthorized'
    //   }
    // })

    // 클라이언트 사이드에서는 아래와 같이 처리
    // console.log({...error.value})

    const errorData = currentWeatherError.value!.data as { cod: number, message: string }
    showError({
      statusCode: currentWeatherError.value!.statusCode,
      statusMessage: currentWeatherError.value!.statusMessage,
      statusText: currentWeatherError.value!.statusText,
      message: currentWeatherError.value!.message,
      data: {
        ...errorData
      }
    })

    selectedCity.value = null
  }
})

watchEffect(() => {
  if (selectedCity.value !== null) {
    currentWeatherExecute()
    fiveDayWeatherForecastExecute()
  }
})

</script>

<template>
  <div v-if="!selectedCity" class="text-center text-gray-500">
    <div
        class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 border border-sky-100"
    >
      <span class="text-3xl">🌤️</span>
    </div>
    <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">
      도시를 선택해 날씨를 확인해보세요
    </p>
    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
      오른쪽 상단 드롭다운에서 지역을 선택하면 현재 날씨 정보가 이곳에 표시됩니다.
    </p>
  </div>
  <template v-if="selectedCity !== null && currentWeatherStatus === 'success'">
    <CurrentWeather :currentWeather="currentWeather!"/>
  </template>

  <template v-if="selectedCity !== null && fiveDayWeatherForecastStatus === 'success'">
    <FiveDayWeatherForecast :fiveDayWeatherForecast="fiveDayWeatherForecast!"/>
  </template>
</template>

<style scoped>
</style>