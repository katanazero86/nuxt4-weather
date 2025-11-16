<script setup lang="ts">
import Box from "~/components/box/Box.vue";
</script>

<template>
    <Header />
    <Box box-class="dark:text-white flex-1 max-w-[1024px] w-full m-auto p-4">
      <slot />
    </Box>
    <Footer />
</template>

<style scoped>

</style>