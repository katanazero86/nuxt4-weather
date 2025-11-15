<script setup lang="ts">

</script>

<template>
  <h2>parent.vue</h2>
  <!--  자식 페이지가 여기에 렌더링 됨.-->
  <NuxtPage v-bind:msg="'hello world'"/>
  <!--  v-bind 축약 :propName= -->
  <!--  <NuxtPage :msg="'hello world'"/>-->
</template>

<style scoped>

</style>