// import { createRouter, createWebHistory } from "vue-router/auto";
import { routes as generatedRoutes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import { authGuard } from "./middlewares/auth_guard";
import { permissionGuard } from "./middlewares/permission_guard";
import { createRouter, createWebHistory } from "vue-router";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to) {
		if (to.hash) return { el: to.hash, behavior: "smooth", top: 60 };

		return { top: 0 };
	},
	routes,
});

router.beforeEach(authGuard);
router.beforeEach(permissionGuard);

export { router };

export default router;
