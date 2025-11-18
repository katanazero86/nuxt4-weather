<script setup lang="ts">
// useFetch Example
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// appid, lay, lon required

// import UseFetchTest2 from "~/pages/use-fetch-test2.vue";

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
    await delay(3000)   // delay
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
  <h2>use-fetch-test2.vue</h2>
  <NuxtLink to="/use-fetch-test">use-fetch-test</NuxtLink>
  <div>
    <button class="p-2 border border-indigo-500 bg-indigo-50 rounded-sm" @click="() => refresh()">refresh</button>
    <button class="p-2 border border-indigo-500 bg-indigo-50 rounded-sm" @click="() => execute()">execute</button>
    <button class="p-2 border border-indigo-500 bg-indigo-50 rounded-sm" @click="clear">clear</button>
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