import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import DialogService from 'primevue/dialogservice'

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

import 'primeflex/primeflex.css'                             //css


import App from './App.vue'
import router from './router'

import './assets/main.css'
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button'
import Fieldset from 'primevue/fieldset';


import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';

import DynamicDialog from 'primevue/dynamicdialog';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable'
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row'; 
import Dialog from 'primevue/Dialog';
import Textarea from 'primevue/Textarea';

import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ToolTip from 'primevue/tooltip';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(DialogService)
app.use(ToastService)

app.directive('tooltip', ToolTip);

app.component('InputSwitch', InputSwitch);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);


app.component('Dropdown', Dropdown);
app.component('Checkbox', Checkbox);
app.component('Dialog', Dialog);
app.component('Textarea', Textarea);






app.component('DynamicDialog', DynamicDialog);
app.component('Calendar', Calendar);


app.mount('#app')
