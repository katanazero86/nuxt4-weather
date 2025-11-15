<script setup lang="ts">
import MoonIcon from "~/components/icons/MoonIcon.vue";
import IconButton from "~/components/buttons/IconButton.vue";
</script>

<template>
<header class="h-16 border-b border-gray-200 px-8 py-4 flex items-center justify-between">
  <p class="text-xl font-bold">Nuxt4 Weather</p>
  <div>
    <IconButton :icon="MoonIcon" :on-click="() => console.log('clicked')"/>
  </div>
</header>
</template>

<style scoped>

</style>