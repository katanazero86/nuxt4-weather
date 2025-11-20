<script setup lang="ts">

import ThrowError from "~/components/ThrowError.vue";
</script>

<template>
  <NuxtErrorBoundary>
    <template #default>
      <h2>정상</h2>
      <!-- 여기서 에러가 발생하면 바운더리가 잡음 -->
      <!-- SSR 에러는 클라이언트의 ErrorBoundary가 잡을 수 없음 -->

      <ThrowError/>
    </template>
    <template #error="{ error }">
      에러 발생
      <p>{{ error }}</p>
    </template>
  </NuxtErrorBoundary>
</template>

<style scoped>

</style>