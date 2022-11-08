import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import '/node_modules/primeflex/primeflex.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import DynamicDialog from 'primevue/dynamicdialog';
import Calendar from 'primevue/calendar';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(DialogService)

app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('DynamicDialog', DynamicDialog);
app.component('Calendar', Calendar);

app.mount('#app')
