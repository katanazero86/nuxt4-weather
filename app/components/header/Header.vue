<script setup lang="ts">
import MoonIcon from "~/components/icons/MoonIcon.vue";
import IconButton from "~/components/buttons/IconButton.vue";
import SunIcon from "~/components/icons/SunIcon.vue";
import { useDarkMode } from "~/composable/useDarkMode";
import { useSelectedCity } from "~/composable/useWeather";
import cityKR from '@/assets/json/city.kr.list.json'

const { isDark, toggleDarkMode } = useDarkMode()

useHead({
  title: 'Nuxt4 Weather',
  htmlAttrs: {
    class: computed(() => (isDark.value ? 'dark' : '')),
  },
})

const computedCityKr = computed(() => {
  return cityKR.map(item => ({
    label: item.name,
    value: String(item.id)
  }))
})

const selectedCity = useSelectedCity()

const handleSelect = (option: {label: string, value: string}) => {
  selectedCity.value = cityKR.find(item => item.id === Number(option.value))!
}


</script>

<template>
  <header
      class="h-16 border-b border-gray-300 px-8 py-4 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 dark:text-white dark:border-gray-500">
    <p class="text-xl font-bold">Nuxt4 Weather</p>
    <div class="flex items-center gap-2">
      <Dropdown :options="computedCityKr" placeholder="Select an city" @onSelect="handleSelect" />
      <IconButton v-if="isDark" :icon="MoonIcon" :onClick="toggleDarkMode"/>
      <IconButton v-if="!isDark" :icon="SunIcon" :onClick="toggleDarkMode"/>
    </div>
  </header>
</template>

<style scoped>

</style>