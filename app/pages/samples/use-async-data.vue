<!-- /samples/use-async-data -->
<!-- https://nuxt.com/docs/4.x/api/composables/use-async-data -->

<script setup lang="ts">

// Reactive Key
const reactiveKey = ref('1')
const handleClick = () => reactiveKey.value = '2'

// key 가 변경되면, 자동으로 페칭
const { data, status, pending, error, refresh, execute, clear } = await useAsyncData(reactiveKey, () => fetch(`https://jsonplaceholder.typicode.com/todos/${reactiveKey.value}`).then(res => res.json()))

// Watch Param
// key 를 설정하지 않으면 파일명과 인스턴스 줄 수로 자동으로 생성해줌.
const postId = ref(1)
const { data: comments } = await useAsyncData(() => $fetch('https://jsonplaceholder.typicode.com/comments', {
  query: { postId: postId.value }
}), {
  watch: [postId]
})

const { data: comments2 } = await useAsyncData(() => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId.value}`).then(res => res.json()), {
  watch: [postId]
})

// useFetch 도 watch 가능
// 하지만, 데이터가 업데이트 되지 않는다. = setup() 함수가 처음 실행 될 때, 아래 URL이 고정되기 때문
const { data: comments3 } = await useFetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId.value}`, {
  watch: [postId]
})

// 이렇게 함수로 사용하면 된다.
// const { data: comments3 } = await useFetch(() => `https://jsonplaceholder.typicode.com/comments?postId=${postId.value}`, {
//   watch: [postId]
// })

</script>

<template>
  <h2>useAsyncData()</h2>
  <div class="border border-gray-300 rounded-md p-4">
    <p>data: {{ data }}</p>
    <p>status: {{ status }}</p>
    <p>pending: {{ pending }}</p>
    <p>error: {{ error }}</p>
  </div>
  <div class="flex flex-col items-center">
    <button class="p-2 border border-indigo-500" @click="() => refresh()">refresh</button>
    <button class="p-2 border border-indigo-500" @click="() => execute()">execute</button>
    <button class="p-2 border border-indigo-500" @click="clear">clear</button>
  </div>
  <div>
    <p>reactiveKey: {{ reactiveKey }}</p>
    <button class="border p-2 border-amber-500" @click="handleClick">key change</button>
  </div>
  <br/>
  <div>
    <button class="border p-2 border-amber-500" @click="postId = postId + 1">postId change</button>
    <p>comments: {{ comments }}</p>
    <br/>
    <p>comments2: {{ comments2 }}</p>
    <br/>
    <p>comments3(postId 가 변경되어도 그대로): {{ comments3 }}</p>
  </div>
</template>

<style scoped>

</style>