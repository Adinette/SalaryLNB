// import { createRouter, createWebHistory } from "vue-router/auto";
// import * as autoRoutes from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import { authGuard } from "./middlewares/auth_guard";
import { permissionGuard } from "./middlewares/permission_guard";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from 'virtual:generated-pages'

// const generatedRoutes = (autoRoutes as any).routes ?? (autoRoutes as any).default ?? (autoRoutes as any);
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 60 }
    return { top: 0 }
  },
})

// Guards
router.beforeEach(authGuard)
router.beforeEach(permissionGuard)

export function registerPlugins(app: any) {
  app.use(router)
}

export default router

