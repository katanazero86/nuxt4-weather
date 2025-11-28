<!-- /samples/error-test -->
<!-- https://nuxt.com/docs/4.x/api/utils/create-error -->

<script setup lang="ts">
throw createError({ statusCode: 404, statusMessage: 'Not Found' })
</script>

<template>
  <h2>errorTest</h2>
</template>

<style scoped>

</style>