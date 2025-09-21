import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { registerPlugins } from '../src/plugins/2.router/index'
import { routes } from 'vue-router/auto-routes'

const app = createApp(App)

registerPlugins(app)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.mount('#app')
