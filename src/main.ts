import App from './App.vue'

import { registerPlugins } from '../src/plugins/2.router/index'
import registerVuetify from '../src/plugins/3.vuetify'   // 👈 renomme pour éviter la confusion
import pinia from '../src/plugins/1.pinia'
import { createApp } from 'vue'
const app = createApp(App)

app.use(pinia)
registerVuetify(app)
registerPlugins(app)

app.mount('#app')
