import type { App } from 'vue'

// Plugins
import { createPinia } from 'pinia'
import router from '../../router'

export function registerPlugins(app: App) {
  app.use(createPinia())
  app.use(router)
  // app.use(vuetify)
  // app.use(i18n)
  // app.use(Toast)
}
