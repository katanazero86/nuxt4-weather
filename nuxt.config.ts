// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/css/tailwind.css', '~/assets/css/global.css'],
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    // app: {
    //     // rootId: 'app', // deprecated
    //     rootTag: 'div',
    //     rootAttrs: {
    //         id: '__nuxt'
    //     }
    // },
    runtimeConfig: {
        server: 'server',
        // 클라이언트 측은, public 와 app 키만 접근 가능(useRuntimeConfig())
        public: {
            OPEN_WEATHER_API_URL: process.env.OPEN_WEATHER_API_URL,
            OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
            test: 'test'
        }
    }
})
