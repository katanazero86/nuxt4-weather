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
})
