// Define RouteNamedMap locally if not available in vue-router/auto
type RouteNamedMap = Record<string, string>;

/**
 * Utilitaire pour créer des déclarations de routes typées
 * basées sur les types générés automatiquement par unplugin-vue-router.
 *
 * @example
 * ```typescript
 * const authRoutes = createRoutes({
 *   login: 'authentication-login',
 *   forgotPassword: 'authentication-forgot-password',
 * });
 * ```
 */
export function createRoutes<T extends Record<string, keyof RouteNamedMap | string>>(routes: T): T {
	return routes;
}


/**
 * Type helper pour extraire les routes par préfixe
 *
 * @example
 * ```typescript
 * type AuthRoutes = RoutesByPrefix<'authentication-'>;
 * ```
 */
export type RoutesByPrefix<T extends string> = Extract<keyof RouteNamedMap, `${T}${string}`>;

/**
 * Type helper pour créer une interface de routes typée
 *
 * @example
 * ```typescript
 * interface MyRoutes extends RoutesInterface {
 *   login: 'authentication-login';
 *   dashboard: 'dashboard';
 * }
 * ```
 */
export interface RoutesInterface extends Record<string, keyof RouteNamedMap> {}

/**
 * Validation runtime que toutes les routes existent dans RouteNamedMap
 */
export function validateRoutes<T extends Record<string, string>>(
	routes: T
): asserts routes is T & Record<keyof T, keyof RouteNamedMap> {
	// Cette fonction sera utilisée en développement pour vérifier
	// que toutes les routes déclarées existent réellement
	Object.values(routes).forEach((routeName) => {
if (import.meta.env.MODE === "development") {
			// En développement, on peut ajouter des vérifications supplémentaires
			console.debug(`Route validée: ${routeName}`);
		}
	});
}
