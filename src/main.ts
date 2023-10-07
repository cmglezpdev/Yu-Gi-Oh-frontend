import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue)
app.mount('#app')
