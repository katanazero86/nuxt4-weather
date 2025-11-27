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

</script>

<template>
  <section class="p-2 grid grid-cols-2 gap-4">
    <div v-for="dtTxt in dtTxtList" :key="dtTxt" class="rounded-lg shadow-md p-4 bg-gray-100 dark:bg-slate-700">
      <h3 class="text-sm font-semibold text-gray-500">{{ dtTxt }}</h3>
      <div class="grid grid-cols-1 gap-2">
        <div v-for="item in fiveDataWeatherForecastList[dtTxt]">
          <p class="text-sm text-gray-500">{{ item.dt_txt }}</p>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>