import { NavigationGuardNext, RouteLocationNormalized } from "vue-router/auto";
import { RouteNamedMap } from "vue-router/auto-routes";
import { useInitializedGlobalStore } from "@/stores";

/**
 * Liste des routes publiques accessibles sans authentification.
 */
const publicRoutes: (keyof RouteNamedMap)[] = [
	appRoutes.authentication.login,
	appRoutes.authentication.forgotPassword,
	"forbidden", // Route d'erreur 403
];

/**
 * Middleware global d'authentification.
 * Se contente de vérifier si l'utilisateur est connecté.
 * La gestion des permissions est déléguée au permissionGuard.
 */
export async function authGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const globalStore = await useInitializedGlobalStore();

	const isPublic = publicRoutes.includes(to.name);
	const isAuthenticated = globalStore.isAuthenticated;

	// Blocage simple : utilisateur non connecté sur route protégée
	if (!isPublic && !isAuthenticated) {
		return next({ name: appRoutes.authentication.login });
	}

	return next();
}
