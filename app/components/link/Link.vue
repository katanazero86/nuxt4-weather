<script setup lang="ts">
import type { Component } from "vue";

const props = withDefaults(
    defineProps<{
      icon?: Component;
      href: string;
      target?: '_blank' | '_parent' | '_self' | '_top';
      iconClass?: string
    }>(),
    {
      target: '_blank',
    }
)

</script>

<template>
  <a href="https://github.com/katanazero86/nuxt4-weather" :target="target"
     class="flex items-center justify-center text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-sm p-2 dark:hover:bg-slate-700">
    <component v-if="icon" :is="icon" :icon-class="iconClass"/>
    <span v-if="$slots.default" :class="icon && 'ml-2'">
      <slot/>
    </span>
  </a>
</template>

<style scoped>

</style>