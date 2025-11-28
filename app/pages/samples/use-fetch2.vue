<!-- /samples/use-fetch2 -->
<!-- https://vuejs.org/guide/built-ins/suspense -->
<!-- Suspense 는 SSR 에서는 동작하지 않고, CSR 에서만 동작하는걸로 확인이 된다. -->

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