<script setup lang="ts">
import Box from "~/components/box/Box.vue";

const configError = useState<string | null>('configError')

</script>

<template>
  <Header/>
  <Box box-class="flex-1 max-w-[1024px] w-full m-auto p-4 bg-gray-50 dark:bg-slate-800 dark:text-white">
    <div v-if="configError" class="bg-red-100 text-red-700 p-3 text-sm rounded">{{ configError }}</div>
    <slot v-else/>
  </Box>
  <Footer/>
</template>

<style scoped>

</style>