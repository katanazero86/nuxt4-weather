<script setup lang="ts">
// useFetch Example
// https://nuxt.com/docs/4.x/api/composables/use-fetch
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// appid, lay, lon required

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const {
  data,
  status,
  error,
  refresh,
  execute,
  pending,
  clear
} = await useFetch('https://api.openweathermap.org/data/2.5/weather', {
  onRequest: async ({ request, options }) => {
    console.log('--- delay start ---')
    await delay(2000)   // delay
    console.log('--- delay end ---')
  },
  onResponse: ({ request, response, options }) =>{
    console.log('--- onResponse ---')
    console.log(response)
    // response._data = 'use-fetch-test' // 이런식으로, 응답 데이터를 덮어쓰면 이 data 를 응답 받음.
  },
  query: { lat: 37.5665, lon: 126.9780, appid: '' }
})

console.log(status.value)
console.log(error.value)
console.log(pending.value)


</script>

<template>
  <h2>use-fetch2/index.vue</h2>
  <NuxtLink class="underline mb-2 inline-block" to="/samples/use-fetch">use-fetch(link)</NuxtLink>
  <div>
    <button class="p-2 border border-indigo-500 bg-indigo-500 rounded-sm" @click="() => refresh()">refresh</button>
    <button class="p-2 border border-indigo-500 bg-indigo-500 rounded-sm" @click="() => execute()">execute</button>
    <button class="p-2 border border-indigo-500 bg-indigo-500 rounded-sm" @click="clear">clear</button>
  </div>
  <div>
    <p>
      data: {{ data }}
    </p>
    <p>
      status: {{ status }}
    </p>
    <p>
      error: {{ error }}
    </p>
    <p>
      pending: {{ pending }}
    </p>
  </div>
</template>

<style scoped>

</style>