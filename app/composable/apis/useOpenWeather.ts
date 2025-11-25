import { computed } from 'vue'
import type { City } from "~/composable/useWeather";


export const useFiveDayWeatherForecast = (selectedCity: Ref<City | null>) => {
    const runtimeConfig = useRuntimeConfig()

    const API_KEY = runtimeConfig.public.OPEN_WEATHER_API_KEY
    const API_URL = runtimeConfig.public.OPEN_WEATHER_API_URL

    const {
        data,
        status,
        pending,
        execute,
        refresh,
        clear,
        error,
    } = useFetch<CurrentWeatherResponse>(() => {
        if (selectedCity.value === null) return ''
        return `${API_URL}/forecast`
    }, {
        immediate: false,
        query: computed(() => ({
            lat: selectedCity.value?.coord.lat,
            lon: selectedCity.value?.coord.lon,
            appid: API_KEY
        })),
        watch: [selectedCity],
        onResponseError: (error) => {
            console.error('Error fetching hourly forecast data:', error)
        }
    })

    return {
        data,
        status,
        pending,
        execute,
        refresh,
        clear,
        error
    }
}

export const useCurrentWeather = (selectedCity: Ref<City | null>) => {

    const runtimeConfig = useRuntimeConfig()

    const API_KEY = runtimeConfig.public.OPEN_WEATHER_API_KEY
    const API_URL = runtimeConfig.public.OPEN_WEATHER_API_URL

    const {
        data,
        status,
        pending,
        execute,
        refresh,
        clear,
        error,
    } = useFetch<CurrentWeatherResponse>(() => {
        if (selectedCity.value === null) return ''
        return `${API_URL}/weather`
    }, {
        immediate: false,
        query: computed(() => ({
            lat: selectedCity.value?.coord.lat,
            lon: selectedCity.value?.coord.lon,
            appid: API_KEY
        })),
        watch: [selectedCity],
        onResponseError: (error) => {
            console.error('Error fetching weather data:', error)
        }
    })


    return {
        data,
        status,
        pending,
        execute,
        refresh,
        clear,
        error
    }
}