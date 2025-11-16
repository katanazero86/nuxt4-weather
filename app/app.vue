<template>
  <div class="min-h-full flex flex-col">
    <!--    <NuxtRouteAnnouncer />-->
    <!--    <NuxtWelcome />-->
    <!--    <NuxtLayout>-->
    <!--      <NuxtPage />-->
    <!--    </NuxtLayout>-->
<!--    <NuxtLoadingIndicator />-->
    <NuxtLayout :name="'my-layout'">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
</script>