<!-- Nuxt 에서는 라우티별로 error.vue 를 지원하지 않고, 루트에 하나만 존재할 수 있음 -->

<script setup lang="ts">
const props = defineProps({
  error: Object,
})

console.log(props.error)

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout :name="'my-layout'">
    <div class="relative font-sans">
      <div class="container max-w-200 mx-auto py-10 px-4">
        <h1>{{ error?.message }}</h1>
        There was an error 😱

        <br>
        <button @click="handleError">
          Clear error
        </button>
        <br>
        <NuxtLink to="/404">
          Trigger another error
        </NuxtLink>
        <br>
        <NuxtLink
            class="text-(--ui-primary)"
            to="/public"
        >
          Navigate home
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>
