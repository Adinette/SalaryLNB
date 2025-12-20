import type { App } from "vue";
import setupPinia from "./1.pinia";
import setupI18n from "./4.i18n";
import setupVueToastification from "./vue-toastification";

export function registerPlugins(app: App) {
  setupPinia(app);
  setupI18n(app);
  setupVueToastification(app);
}