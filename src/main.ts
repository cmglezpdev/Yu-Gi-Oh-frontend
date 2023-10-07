import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import router from '@/router/router'
import AppVue from './App.vue'

const app = createApp(AppVue)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
