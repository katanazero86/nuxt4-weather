<script setup lang="ts">
import type { Component } from "vue";

const props = withDefaults(
    defineProps<{
      icon: Component;
      onClick: () => void
      buttonClass?: string
      iconClass?: string
    }>(),
    {
      buttonClass: 'hover:bg-gray-100 rounded-sm p-2 cursor-pointer dark:hover:bg-slate-700'
    }
)
</script>

<template>
  <button :class="buttonClass" @click="onClick">
    <component :is="icon" :icon-class="iconClass" />
  </button>
</template>

<style scoped>

</style>