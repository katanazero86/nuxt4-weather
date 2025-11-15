<script setup lang="ts">
import MoonIcon from "~/components/icons/MoonIcon.vue";
import IconButton from "~/components/buttons/IconButton.vue";
import SunIcon from "~/components/icons/SunIcon.vue";
import { useDarkMode } from "~/composable/useDarkMode";

const { isDark, toggleDarkMode } = useDarkMode()

</script>

<template>
  <header
      class="h-16 border-b border-gray-200 px-8 py-4 flex items-center justify-between dark:bg-slate-800 dark:text-white">
    <p class="text-xl font-bold">Nuxt4 Weather</p>
    <div>
      <IconButton v-if="isDark" :icon="MoonIcon" :on-click="toggleDarkMode"/>
      <IconButton v-if="!isDark" :icon="SunIcon" :on-click="toggleDarkMode"/>
    </div>
  </header>
</template>

<style scoped>

</style>