import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { registerPlugins } from '../src/plugins/2.router/index'
import registerVuetify from '../src/plugins/3.vuetify'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)

registerVuetify(app)

registerPlugins(app)

app.mount('#app')
