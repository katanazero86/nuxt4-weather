<script setup lang="ts">
import dayjs from 'dayjs'
import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import { useDarkMode } from '~/composable/useDarkMode'

const props = defineProps<{ fiveDayWeatherForecast: FiveDayWeatherForecastResponse }>()

const { isDark } = useDarkMode()

const targetCategories = computed(() => props.fiveDayWeatherForecast.list.map(({ dt_txt }) => dt_txt))

const series = computed<ApexAxisChartSeries>(() => [
  {
    name: 'series',
    data: props.fiveDayWeatherForecast.list.map(({ wind: { speed } }) => speed),
  },
])

const chartKey = computed(() => {
  const cityId = props.fiveDayWeatherForecast.city.id
  const categoriesKey = targetCategories.value.join('|')

  return `${cityId}:${categoriesKey}`
})

const computedOptions = computed<ApexOptions>(() => ({
  chart: {
    id: 'fiveday-weather-forecast-chart',
    type: 'line',
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: true,
    },
    background: isDark.value ? '#1e1e1e' : '#ffffff',
  },
  colors: isDark.value ? ['#4dabf7'] : ['#1e88e5'],
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  title: {
    text: 'forecast-wind',
    style: {
      color: isDark.value ? '#fff' : '#333',
    },
  },
  xaxis: {
    categories: targetCategories.value,
    labels: {
      style: {
        fontSize: '12px',
        colors: isDark.value ? '#fff' : '#333',
      },
      formatter: (value) => dayjs(value).format('MM-DD HH:mm'),
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: isDark.value ? '#ccc' : '#333',
      },
    },
  },
  tooltip: {
    x: {
      formatter: (value, opts) => {
        const raw = targetCategories.value[opts.dataPointIndex]
        return dayjs(raw).format('YYYY-MM-DD HH:mm')
      },
    },
    y: {
      formatter: (value) => `${value} m/s`,
      title: {
        formatter: () => '풍속:',
      },
    },
  },
}))
</script>

<template>
  <section class="py-2">
    <ClientOnly>
      <div id="fiveday-weather-forecast-chart">
        <apexchart
          :key="chartKey"
          width="100%"
          height="500"
          :options="computedOptions"
          :series="series"
        />
      </div>
    </ClientOnly>
  </section>
</template>

<style>
html.dark #fiveday-weather-forecast-chart .apexcharts-tooltip {
  background: rgba(30, 30, 30, 0.95) !important;
  color: #e5e5e5 !important;
  border-radius: 8px !important;
  border: 1px solid #3a3a3a !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5) !important;
}

html.dark #fiveday-weather-forecast-chart .apexcharts-tooltip-title {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #e5e5e5 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

html.dark #fiveday-weather-forecast-chart .apexcharts-menu {
  background: rgba(30, 30, 30, 0.92) !important;
  color: #eee !important;
  border-radius: 6px !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.5) !important;
  padding: 4px 0 !important;
}

html.dark #fiveday-weather-forecast-chart .apexcharts-menu-item {
  color: #eee !important;
  /* padding: 8px 14px !important; */
}

html.dark #fiveday-weather-forecast-chart .apexcharts-menu-item:hover {
  background: rgba(255, 255, 255, 0.08) !important;
}
</style>
