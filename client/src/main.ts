import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

import App from './App.vue'
import router from './router'

import './assets/main.css'
import InputSwitch from 'primevue/inputswitch';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('InputSwitch', InputSwitch);

app.mount('#app')
