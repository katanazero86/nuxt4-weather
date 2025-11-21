export const useText = () => {
    const text = useCookie('my-text', {
        path: '/',
        default: () => 'default text'
    })
    return { text }
}