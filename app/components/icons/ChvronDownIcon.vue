<script setup lang="ts">
const props = withDefaults(
    defineProps<{ iconClass?: string }>(),
    {
      iconClass: 'text-black dark:text-white'
    }
)
</script>

<template>
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='18' height='18' :class="iconClass">
    <path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9l6 6l6-6'/>
  </svg>
</template>

<style scoped>

</style>