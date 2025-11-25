<script setup lang="ts">
const props = defineProps<{currentWeather: CurrentWeatherResponse}>()

const getIconUrl = (weatherIcon: string = '') => {
  return `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
};

const getTemperature = (temp: number = 0) => {
  return parseFloat((temp - 273.15).toFixed(1));
};
</script>

<template>
  <section class="rounded-lg shadow-md p-4 bg-gray-100 dark:bg-slate-700">
    <h2 class="text-3xl text-center font-bold text-gray-900 dark:text-white">
      Weather in {{ currentWeather?.name }}, {{ currentWeather?.sys.country }}
    </h2>
    <div class="flex flex-col items-center mt-4">
      <img :src="getIconUrl(currentWeather?.weather[0].icon)" :alt="currentWeather?.weather[0].icon" class="h-24 w-24"/>
      <p class="text-lg font-semibold">{{ currentWeather?.weather[0].main }} / <span>{{
          getTemperature(currentWeather?.main.temp)
        }} °C</span></p>
    </div>
    <div class="mx-[-16px]">
      <p class="weather-list-item first:border-none">
        <span>풍속(Wind)</span>
        <span>{{ currentWeather?.wind.speed }} m/s</span>
      </p>
      <p class="weather-list-item">
        <span>구름량(Cloudiness)</span>
        <span>{{ currentWeather?.clouds.all }} %</span>
      </p>
      <p class="weather-list-item">
        <span>압력(Pressure)</span>
        <span>{{ currentWeather?.main.pressure }} hPa</span>
      </p>
      <p class="weather-list-item">
        <span>습기(Humidity)</span>
        <span>{{ currentWeather?.main.humidity }} %</span>
      </p>
      <p class="weather-list-item">
        <span>일출(Sunrise)</span>
        <span>{{ new Date(currentWeather?.sys.sunrise ?? 0 * 1000).toLocaleTimeString() }}</span>
      </p>
      <p class="weather-list-item">
        <span>일몰(Sunset)</span>
        <span>{{ new Date(currentWeather?.sys.sunset ?? 0 * 1000).toLocaleTimeString() }}</span>
      </p>
      <p class="weather-list-item">
        <span>지리 좌표(Geo coords)</span>
        <span>[{{ currentWeather?.coord.lat }}, {{ currentWeather?.coord.lon }}]</span>
      </p>
    </div>
  </section>
</template>

<style scoped>

</style>