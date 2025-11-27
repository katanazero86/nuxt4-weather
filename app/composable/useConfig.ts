export const useConfig = () => {
    const runtimeConfig = useRuntimeConfig()

    return { ...runtimeConfig }
}