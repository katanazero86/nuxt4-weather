export default defineNuxtPlugin(() => {
    const { public: cfg } = useRuntimeConfig()
    const configError = useState<string | null>('configError', () => null)

    if (!cfg.OPEN_WEATHER_API_URL) {
        console.error('OPEN_WEATHER_API_URL missing')
        // throw new Error('OPEN_WEATHER_API_URL is required')
    }
    if (!cfg.OPEN_WEATHER_API_KEY) {
        console.error('OPEN_WEATHER_API_KEY missing')
        // throw new Error('OPEN_WEATHER_API_KEY is required')
    }

    if (!cfg.OPEN_WEATHER_API_URL || !cfg.OPEN_WEATHER_API_KEY) {
        configError.value = '환경변수 OPEN_WEATHER_* 가 없습니다. 설정 후 다시 시도해주세요.'
        console.error(configError.value)
    }
})