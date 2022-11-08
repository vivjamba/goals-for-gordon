import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css'                             //css

import App from './App.vue'
import router from './router'

import './assets/main.css'
import InputSwitch from 'primevue/inputswitch';
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row


const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.component('InputSwitch', InputSwitch);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);




app.mount('#app')
