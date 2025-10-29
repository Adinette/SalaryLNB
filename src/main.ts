import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerPlugins } from '../src/plugins/2.router/index'
import vuetify from '../src/plugins/3.vuetify' // <-- nouveau import
import pinia from '../src/plugins/1.pinia' // <-- nouveau import


const app = createApp(App)
app.use(pinia)
app.use(vuetify)         // <-- IMPORTANT : enregistrer Vuetify avant le rendu
// Cette fonction enregistre déjà ton router, guards, etc.
registerPlugins(app)

app.mount('#app')
