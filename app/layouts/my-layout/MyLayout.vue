<script setup lang="ts">
import Box from "~/components/box/Box.vue";
</script>

<template>
  <Header/>
  <Box box-class="flex-1 max-w-[1024px] w-full m-auto p-4 bg-gray-50 dark:bg-slate-800 dark:text-white">
    <slot/>
  </Box>
  <Footer/>
</template>

<style scoped>

</style>