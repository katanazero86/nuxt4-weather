<script setup lang="ts">

const handleClick = async (e: Event) => {
  e.preventDefault()
  await navigateTo('/')
}

</script>

<template>
<h2>
  about.vue
</h2>
  <div>
    <a class="text-sm text-indigo-600 semi-bold cursor-pointer hover:underline" @click="handleClick">index</a>
  </div>
</template>

<style scoped>

</style>