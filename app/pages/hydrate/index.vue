<!--
서버에서 컴포넌트를 컴파일 하고 HTML 생성 및 응답
CSS, JS 응답
JS 실행하고 정적 HTML을 상호 작용 가능한 HTML로 변환(여기서는 상호작용 가능한 Vue 애플리케이션으로 변환하는 과정)
-->

<!--
Nuxt 에는 서버 컴포넌트 개념은 없음
서버/클라이언트에서 script 영역에 setup() 함수가 모두 실행
특정 생명주기 훅만 실행환경이 다름
-->

<!--
응답받은 HTML을 확인하면, entry.async.js 가 type="module" 속성을 가진 스크립트 태그가 존재
위 스크립트가 로딩 및 실행이 되면서 실제 애플리케이션 초기화과 이뤄지는 entry.js 를 로딩 및 실행
해당 스크립트를 보면 createApp() 을 통해 Vue 애플리케이션을 생성하고 mount() 를 호출하여 실제 DOM 요소에 렌더링을 함.
-->

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";

console.log('hydrate') // setup() 는 서버에서 한 번, 클라이언트에서 한 번 총 두 번 실행이 됨

const num = ref(0)

// -- 서버에서는 실행 안됨 --
onBeforeMount(() => { // 라이프 사이클 훅은 서버에서 실행 안됨
  console.log('before mount')
  num.value++ // 하이드레이션 전에 실행이 되어 미스매치 발생
})

onMounted(() => {
  console.log('mounted')
  // num.value++ // / 하이드레이션 "이후"에 실행이 되어 미스매치 발생 안함
})

// 서버 또는 클라이언트 환경 감지
// 레거시
if(process.client) console.log('client')
if(process.server) console.log('server')

if(import.meta.server) console.log('server')
if(import.meta.client) console.log('client')

// 에러 발생(서버에는 window 객체가 없음)
// window.localStorage.getItem('test') // Cannot read properties of undefined

</script>

<template>
<h2>hydrate</h2>
  <p>num: {{num}}</p>
</template>

<style scoped>

</style>