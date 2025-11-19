export const useOutside = (callback: () => void) => {
    const containerRef = ref<HTMLElement | null>(null)
    const handleOutsideClick = (e: MouseEvent) => {
        e.stopPropagation()
        if(containerRef.value && !containerRef.value.contains(e.target as Node)) {
            callback()
        }
    }


    onMounted(() => {
        window.addEventListener('click', handleOutsideClick)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('click', handleOutsideClick)
    })

    return {
        containerRef
    }
}