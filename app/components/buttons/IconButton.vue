<script setup lang="ts">
import type { Component } from "vue";

const props = withDefaults(
    defineProps<{
      icon: Component;
      onClick: () => void
      buttonClass?: string
    }>(),
    {
      buttonClass: 'hover:bg-gray-200 rounded-sm p-2 cursor-pointer'
    }
)
</script>

<template>
  <button :class="buttonClass" @click="props.onClick">
    <component :is="props.icon" />
  </button>
</template>

<style scoped>

</style>