import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import { createPinia } from 'pinia'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Textarea from 'primevue/textarea'

// optional

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

/////////////////////
app.component('DataTable', DataTable)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Row', Row)
app.component('InputIcon', InputIcon)
app.component('IconField', IconField)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmationService', ConfirmationService)
app.component('Toast', Toast)
app.component('Textarea', Textarea)

app.mount('#app')
