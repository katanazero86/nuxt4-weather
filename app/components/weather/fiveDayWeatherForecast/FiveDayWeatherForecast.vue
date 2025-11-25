<script setup lang="ts">
const props = defineProps<{ fiveDayWeatherForecast: FiveDayWeatherForecastResponse }>()
</script>

<template>
  <h2>test</h2>
  <section>fiveDayWeatherForecast</section>
  {{ fiveDayWeatherForecast }}
</template>

<style scoped>

</style>