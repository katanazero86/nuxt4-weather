import { computed } from 'vue'
import type { City } from "~/composable/useWeather";


export const useHourlyForcast = () => {
}


type WeatherData = {
    coord: {
        lon: number,
        lat: number,
    };
    weather: [
        {
            id: number | string,
            main: string,
            description: string,
            icon: string
        }
    ];
    base: string;
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number;
    wind: {
        speed: number,
        deg: number
    };
    clouds: {
        all: number
    };
    dt: number,
    sys: {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number
    };
    timezone: number;
    id: number | string;
    name: string;
    cod: number;
}

export const useCurrentWeather = (selectedCity: Ref<City | null>) => {

    const runtimeConfig = useRuntimeConfig()
    console.log(runtimeConfig.server) // 클라이언트에서는 undefined
    if(import.meta.server) {
        console.log('server env:', runtimeConfig.server)
    }

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
    } = useFetch<WeatherData>(() => {
        if(selectedCity.value === null) return ''
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