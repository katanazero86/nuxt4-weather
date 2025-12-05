import { computed } from 'vue'
import type { City } from "~/composable/useWeather";
import { useConfig } from "~/composable/useConfig";

export const useFiveDayWeatherForecast = (selectedCity: Ref<City | null>) => {

    const { public: {OPEN_WEATHER_API_KEY: API_KEY, OPEN_WEATHER_API_URL: API_URL} } = useConfig()

    const {
        data,
        status,
        pending,
        execute,
        refresh,
        clear,
        error,
    } = useFetch<FiveDayWeatherForecastResponse>(() => {
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

    const { public: {OPEN_WEATHER_API_KEY: API_KEY, OPEN_WEATHER_API_URL: API_URL} } = useConfig()

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