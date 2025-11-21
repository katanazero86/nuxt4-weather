<script setup lang="ts">
type WeatherData = {
  coord: {
    lon: number,
    lat: number,
  };
  weather: [
    {
      id: number | string,
      main: string,
      description: string,
      icon: string
    }
  ];
  base: string;
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  visibility: number;
  wind: {
    speed: number,
    deg: number
  };
  clouds: {
    all: number
  };
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  };
  timezone: number;
  id: number | string;
  name: string;
  cod: number;
}

import { useSelectedCity } from "~/composable/useWeather";

const selectedCity = useSelectedCity()

const { data, status, pending, error, execute } = useFetch<WeatherData>(() => {
  if (selectedCity.value === null) return ''
  return 'https://api.openweathermap.org/data/2.5/weather'
}, {
  immediate: false,
  query: computed(() => ({
    lat: selectedCity.value?.coord.lat,
    lon: selectedCity.value?.coord.lon,
    appid: ''
  })),
  watch: [selectedCity],
  onResponseError: (error) => {
    console.error('Error fetching weather data:', error)
  }
})

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
  if (status.value === 'error') {

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

    const errorData = error.value!.data as  { cod: number, message: string }
    showError({
      statusCode: error.value!.statusCode,
      statusMessage: error.value!.statusMessage,
      statusText: error.value!.statusText,
      message: error.value!.message,
      data: {
        ...errorData
      }
    })

    selectedCity.value = null
  }
})

watchEffect(() => {
  if(selectedCity.value !== null) execute()
})

const getIconUrl = (weatherIcon: string = '') => {
  return `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
};

const getTemperature = (temp: number = 0) => {
  return parseFloat((temp - 273.15).toFixed(1));
};

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
  <template v-if="selectedCity !== null && status === 'success'">
    <section class="rounded-lg shadow-md p-4 bg-gray-100 dark:bg-slate-700">
      <h2 class="text-3xl text-center font-bold text-gray-900 dark:text-white">
        Weather in {{ data?.name }}, {{ data?.sys.country }}
      </h2>
      <div class="flex flex-col items-center mt-4">
        <img :src="getIconUrl(data?.weather[0].icon)" :alt="data?.weather[0].icon" class="h-24 w-24"/>
        <p class="text-lg font-semibold">{{ data?.weather[0].main }} / <span>{{
            getTemperature(data?.main.temp)
          }} °C</span></p>
      </div>
      <div class="mx-[-16px]">
        <p class="weather-list-item first:border-none">
          <span>풍속(Wind)</span>
          <span>{{ data?.wind.speed }} m/s</span>
        </p>
        <p class="weather-list-item">
          <span>구름량(Cloudiness)</span>
          <span>{{ data?.clouds.all }} %</span>
        </p>
        <p class="weather-list-item">
          <span>압력(Pressure)</span>
          <span>{{ data?.main.pressure }} hPa</span>
        </p>
        <p class="weather-list-item">
          <span>습기(Humidity)</span>
          <span>{{ data?.main.humidity }} %</span>
        </p>
        <p class="weather-list-item">
          <span>일출(Sunrise)</span>
          <span>{{ new Date(data?.sys.sunrise ?? 0 * 1000).toLocaleTimeString() }}</span>
        </p>
        <p class="weather-list-item">
          <span>일몰(Sunset)</span>
          <span>{{ new Date(data?.sys.sunset ?? 0 * 1000).toLocaleTimeString() }}</span>
        </p>
        <p class="weather-list-item">
          <span>지리 좌표(Geo coords)</span>
          <span>[{{ data?.coord.lat }}, {{ data?.coord.lon }}]</span>
        </p>
      </div>
    </section>
  </template>
</template>

<style scoped>
</style>