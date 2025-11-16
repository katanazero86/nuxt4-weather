<script setup lang="ts">

</script>

<template>
  <Suspense>
    <template #default>
      <NuxtPage/>
    </template>
    <template #fallback>
      <h2>loading...</h2>
    </template>
  </Suspense>
</template>

<style scoped>

</style>