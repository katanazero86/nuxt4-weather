<script setup lang="ts">

import GithubIcon from "~/components/icons/GithubIcon.vue";
import Link from "~/components/link/Link.vue";
</script>

<template>
  <footer class="flex items-center justify-between h-16 border-t border-gray-200 py-4 px-8 dark:bg-slate-800">
    <p class="text-sm text-gray-500 dark:text-gray-300">
      Powered by OpenWeather API · © 2025 katanazero86
    </p>
    <div>
      <Link href="https://github.com/katanazero86" target="_blank" :icon="GithubIcon"/>
    </div>
  </footer>
</template>

<style scoped>

</style>