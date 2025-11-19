// import { onMounted } from 'vue'

export const useDarkMode = () => {
    // const isDark = ref(false)
    // onMounted(() => {
    //     if (window.localStorage && window.localStorage.getItem('colorMode') !== null) {
    //         if (window.localStorage.getItem('colorMode') === 'dark') {
    //             isDark.value = true
    //             document.documentElement.classList.add('dark')
    //         }
    //     } else {
    //         if (window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches) {
    //             isDark.value = true
    //             window.localStorage && localStorage.setItem('colorMode', 'dark')
    //             document.documentElement.classList.add('dark')
    //         } else {
    //             window.localStorage && localStorage.setItem('colorMode', 'light')
    //         }
    //     }
    // })
    //
    // const toggleDarkMode = () => {
    //     isDark.value = !isDark.value
    //     window.localStorage && window.localStorage.setItem('colorMode', isDark.value ? 'dark' : 'light')
    //     document.documentElement.classList.toggle('dark')
    // }

    const colorMode = useCookie('colorMode',
        {
            default: () => 'light',
        }
    )

    const isDark = computed(() => colorMode.value === 'dark')

    const toggleDarkMode = () => {
        colorMode.value = colorMode.value === "light" ? "dark" : "light"
        document.documentElement.classList.toggle('dark')
    }

    return {
        isDark,
        colorMode,
        toggleDarkMode
    }
}