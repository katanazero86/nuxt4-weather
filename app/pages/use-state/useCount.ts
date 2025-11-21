
// key, init() 을 인자로 가진다.
// 보통은 함수 형태로 작성하여 사용
export const useCount = () => {
    const count = useState('count', () => 0)
    const increment = () => count.value++
    return { count, increment }
}

// 아래와 같이 사용하고, import 만 해도
// [nuxt] A composable that requires access to the Nuxt instance was called outside of a plugin, Nuxt hook, Nuxt middleware, or Vue setup function. This is probably not a Nuxt bug. Find out more at `https://nuxt.com/docs/4.x/guide/concepts/auto-imports#vue-and-nuxt-composables`.
// useState() 가 바로 실행됌, 하지만 이 시점에서는 Nuxt 앱이 아직 준비되지 않음
// Nuxt composable 은 Nuxt 실행 컨텍스트 안에서 동작해야하는데 import 되자마자 실행이 되면 아직 Nuxt 컨텍스트가 아니라서 에러가 발생
// export const count = useState('counter', () => 0)
