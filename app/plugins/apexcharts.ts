// https://nuxt.com/docs/4.x/directory-structure/app/plugins

import VueApexCharts from 'vue3-apexcharts'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueApexCharts)
})
