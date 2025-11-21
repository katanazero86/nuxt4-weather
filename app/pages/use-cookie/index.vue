<script setup lang="ts">

// 쿠키 사용
 import { useText } from "~/pages/use-cookie/useText";

const {text} = useText()
</script>

<template>
  <h2>useCookie composable</h2>
  {{ text }}
  <button class="p-2 border border-indigo-600" @click="text = 'changed'">change text</button>
</template>

<style scoped>

</style>