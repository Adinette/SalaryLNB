import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { registerPlugins } from '../src/plugins/2.router/index'
import registerVuetify from '../src/plugins/3.vuetify'   // 👈 renomme pour éviter la confusion
import pinia from '../src/plugins/1.pinia'

const app = createApp(App)

app.use(pinia)

// ❗ Appelle ta fonction et passe-lui `app`
registerVuetify(app)

registerPlugins(app)

app.mount('#app')
