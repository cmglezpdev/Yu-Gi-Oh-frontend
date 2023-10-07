import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import router from '@/router/router'
import AppVue from './App.vue'

// import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import 'primeicons/primeicons.css'

const app = createApp(AppVue)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
