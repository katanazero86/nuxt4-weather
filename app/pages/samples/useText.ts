// useCookie
// https://nuxt.com/docs/4.x/api/composables/use-cookie

export const useText = () => {
    const text = useCookie('my-text', {
        path: '/',
        default: () => 'default text',
        // readonly : true, // read only 설정 기본값은 false
    })
    return { text }
}