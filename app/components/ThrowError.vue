<script setup lang="ts">
// throw new Error('test error')
// throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
onMounted(() => {
  throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
})
</script>

<template>
<div>throwError</div>
</template>

<style scoped>

</style>