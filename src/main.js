import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BootstrapVue3 from 'bootstrap-vue-3';

// import viLocale from 'element-plus/dist/locale/vi.mjs'

// window.MyConfig.language == 'vi'
// locale.use(viLocale)

// if (window.MyConfig.language == "vi") {
//   locale.use(viLocale)
// }
// if (window.MyConfig.language == "en") {
//   locale.use(enLocale)
// }

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(BootstrapVue3)
app.use(ElementPlus, { size: 'default', zIndex: 3000 })

app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)

app.mount('#app')
