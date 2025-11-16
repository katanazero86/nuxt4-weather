<script setup lang="ts">
  const props = withDefaults(
      defineProps<{ boxClass?: string }>(),
      {
        boxClass: ''
      }
  )
</script>

<template>
<div :class="boxClass">
  <slot />
</div>
</template>

<style scoped>

</style>