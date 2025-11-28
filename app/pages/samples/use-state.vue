<!-- /samples/use-state -->
<!-- https://nuxt.com/docs/4.x/api/composables/use-state -->

<script setup lang="ts">
import UseStateChild from "~/components/samples/useStateChild.vue";
import { useCount } from "./useCount";

const { count } = useCount()

</script>

<template>
  <h2>useState composable</h2>
  <p>count : {{ count }}</p>
  <UseStateChild />
</template>

<style scoped>

</style>