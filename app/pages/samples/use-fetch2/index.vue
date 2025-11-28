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

    // if(response.status === 401) {
    //   console.error('401 error')
    //   throw new Error('401 error 입니다.') // 이렇게 하면, 바운더리에 잡히지 않음. + error.value 보면 메시지가 이걸로 바뀌어 있음.
    // }
  },
  query: { lat: 37.5665, lon: 126.9780, appid: '' }
})

console.log(status.value)
console.log(error.value)
console.log(pending.value)
// 401 응답이 오는데, error.value 하면 에러 정보가 들어있다. 내부에서 HTTP Status 2XX 가 아니면 자동으로 throw 해서 처리 해주는 거다.


// setup 단계에서 바로 에러 감지 후 throw
// 이런식으로 처리하는 경우에는 api 호출 해서 상태 변경 시, setup() 가 재실행 되는 것이 아니므로 watch, watchEffect 로 변화를 감지해야 함.
// 아래 주석을 해제하면, 바운더리에서 잡힘.
// if(import.meta.client && status.value === 'error') {
//   throw createError({
//     statusCode: error.value?.statusCode ?? 500,
//     statusMessage: error.value?.statusMessage ?? 'Fetch Error'
//   })
// }

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