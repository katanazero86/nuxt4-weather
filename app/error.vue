<!-- Nuxt 에서는 라우티별로 error.vue 를 지원하지 않고, 루트에 하나만 존재할 수 있음 -->
<!-- 새로운 html로 렌더링 하여 dark 모드가 적용 안되는 이슈가 있음 -->

<script setup lang="ts">
import { clearError } from '#app'
import type { NuxtError } from '#app'
import { useDarkMode } from "~/composable/useDarkMode";

const props = defineProps({
  error: Object as () => NuxtError,
})

const { isDark } = useDarkMode()

const statusCode = props.error?.statusCode
const statusMessage = props.error?.statusMessage
const message = (props.error?.data as { message: string; cod: number })?.message

function handleClick(e: Event) {
  // showError() createError() 를 해줬다면 clearError() 를 통해 전역 에러 상태를 해제해야함.
  e.preventDefault()
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-full dark:bg-slate-800" :class="isDark ? 'dark' : ''">
    <div class="w-full max-w-[650px] px-2 py-4 shadow-sm rounded-lg bg-gray-100 dark:bg-slate-700">
      <h1 class="text-6xl text-center font-semibold dark:text-white">{{ statusCode }}</h1>
      <p class="text-3xl text-center dark:text-white">
        {{ statusMessage }}.
      </p>
      <div class="text-center text-gray-600 dark:text-gray-300 mt-4">
        <p>
          {{ message }}
        </p>
        <p class="mt-2 font-semibold">
          If the problem persists, please try again later.
        </p>
      </div>
      <div class="text-center">
        <button
            @click="handleClick"
            class="text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-md mt-4 cursor-pointer"
            to="/"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
