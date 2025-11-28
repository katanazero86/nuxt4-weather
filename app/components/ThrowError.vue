<script setup lang="ts">
// throw new Error('test error')

// /apps/error.vue 컴포넌트 렌더링
// throw createError({ statusCode: 800, statusMessage: 'Error Message' })

onMounted(() => {
  // 컴포넌트가 이미 마운트 된 이후에 에러 발생
  throw createError({ statusCode: 400, statusMessage: 'Bad Request' })
})
</script>

<template>
<div>throwError</div>
</template>

<style scoped>

</style>