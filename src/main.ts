import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import router from '@/router/router'
import AppVue from './App.vue'

import 'primevue/resources/themes/md-dark-deeppurple/theme.css'
// import 'primevue/resources/themes/md-light-deeppurple/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import AnimateOnScroll from 'primevue/animateonscroll';
import ToastService from 'primevue/toastservice';
                
const app = createApp(AppVue)

app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.directive('animateonscroll', AnimateOnScroll);

app.mount('#app')
