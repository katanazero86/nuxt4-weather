<script setup lang="ts">
import { useCount } from "~/pages/use-state/useCount";

const { increment } = useCount()

const count = useState('count') // 이런식으로 바로 참조 가능
</script>

<template>
  <h2>useStateChild: {{count}}</h2>
  <button class="p-2 border border-indigo-600" @click="increment">increment</button>
</template>

<style scoped>

</style>