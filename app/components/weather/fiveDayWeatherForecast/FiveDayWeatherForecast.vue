<script setup lang="ts">
import { formatDateToYYYYMMDD } from "~/utils/format.utils";

const props = defineProps<{ fiveDayWeatherForecast: FiveDayWeatherForecastResponse }>()

const fiveDataWeatherForecastList = computed<Record<string, FiveDayWeatherForecastItem[]>>(() => {
  if (props.fiveDayWeatherForecast.list.length === 0) return {} as Record<string, FiveDayWeatherForecastItem[]>
  const result = Object.groupBy(props.fiveDayWeatherForecast.list, ({ dt_txt }) => {
    const formatDtTxt = formatDateToYYYYMMDD(dt_txt)
    return formatDtTxt
  }) as Record<string, FiveDayWeatherForecastItem[]>

  return result
})

// console.log(fiveDataWeatherForecastList.value)

const dtTxtList = computed(() => Object.keys(fiveDataWeatherForecastList.value) ?? [])

const getIconUrl = (weatherIcon: string = '') => {
  return `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
};

const getTemperature = (temp: number = 0) => {
  return parseFloat((temp - 273.15).toFixed(1));
};

</script>

<template>
  <section class="p-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div v-for="dtTxt in dtTxtList" :key="dtTxt" class="rounded-lg shadow-md p-4 bg-gray-100 dark:bg-slate-700">
      <h3 class="text-sm font-semibold text-gray-500bg-gray-200 py-2 border-b border-b-gray-300 mx-[-16px] px-4">
        {{ dtTxt }}</h3>
      <div class="grid grid-cols-1 gap-2">
        <div v-for="item in fiveDataWeatherForecastList[dtTxt]" class="py-1 flex items-center justify-around">
          <div>
            <p class="text-sm text-gray-500">{{ item.dt_txt }}</p>
            <p class="text-sm text-gray-500">{{ item.weather[0]?.description ?? '-' }}</p>
          </div>
          <div>
            <img :src="getIconUrl(item.weather[0]?.icon)" :alt="item.weather[0]?.icon ?? ''"
                 class="h-14 w-14" width="14" height="14"/>
            <p class="text-sm">{{
                getTemperature(item.main.temp)
              }} °C</p>
          </div>
          <div>
            <p class="text-sm text-blue-600">{{
                getTemperature(item.main.temp_min)
              }} °C</p>
            <p class="text-sm text-red-600">{{
                getTemperature(item.main.temp_max)
              }} °C</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>