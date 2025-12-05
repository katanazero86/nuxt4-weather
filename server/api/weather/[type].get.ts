// 서버 캐시
export default cachedEventHandler(async (event) => {
    const { type } = event.context.params! // weather | forecast
    const { lat, lon } = getQuery(event)
    const cfg = useRuntimeConfig()

    return $fetch(`${cfg.public.OPEN_WEATHER_API_URL}/${type}`, {
        query: { lat, lon, appid: cfg.public.OPEN_WEATHER_API_KEY }
    })
}, {
    maxAge: 300, // 초 단위 TTL, 5분
    swr: true,   // 만료 후 백그라운드 갱신(stale-while-revalidate)
})