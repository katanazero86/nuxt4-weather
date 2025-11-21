<script setup lang="ts">
import UseStateChild from "~/components/samples/useStateChild.vue";
import { useCount } from "~/pages/use-state/useCount";

const { count } = useCount()

</script>

<template>
  <h2>useState composable</h2>
  <p>count : {{ count }}</p>
  <UseStateChild />
</template>

<style scoped>

</style>