import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import InputNumber from 'primevue/inputnumber';

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'

const app = createApp(App)
app.component("Button", Button)
app.component("InputNumber", InputNumber)

app.use(PrimeVue)

app.mount('#app')
