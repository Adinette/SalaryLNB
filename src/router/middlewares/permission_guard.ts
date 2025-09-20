import { NavigationGuardNext, RouteLocationNormalized } from "vue-router/auto";
import { useInitializedGlobalStore } from "@/stores";
import { type AppPermission } from "@/modules/permissions/enums/permission_enum";
import menu from "@/data/menu";
import { createLogger } from "@/utils/logger";

const logger = createLogger("permissionGuard");

/**
 * Vérifie si l'utilisateur a les permissions pour accéder à une route.
 * Version pour middleware router (sans composables).
 */
async function checkRoutePermissions(routeName: string): Promise<boolean> {
	const globalStore = await useInitializedGlobalStore();

	if (!globalStore.isAuthenticated) {
		logger.warn(`Accès refusé - Utilisateur non authentifié pour: ${routeName}`);
		return false;
	}

	// const currentEmployee = globalStore.currentSession?.employee;
	// if (!currentEmployee) {
	// 	logger.warn(`Accès refusé - Employé non trouvé pour: ${routeName}`);
	// 	return false;
	// }

	// const userPermissions = currentEmployee.role.permissions;
	// logger.debug(`Vérification permissions pour ${routeName}`, {
	// 	userId: currentEmployee.id,
	// 	userRole: currentEmployee.role,
	// 	userPermissions: userPermissions,
	// });

	const currentEmployee = globalStore.currentSession?.user;
	if (!currentEmployee) {
		logger.warn(`Accès refusé - Employé non trouvé pour: ${routeName}`);
		return false;
	}
	const currentRole = currentEmployee.role;

	const userPermissions = currentRole.permissions;
	logger.debug(`Vérification permissions pour ${routeName}`, {
		userId: currentEmployee.id,
		userRole: currentRole,
		userPermissions: userPermissions,
	});

	// Fonction pour vérifier si l'utilisateur a une permission
	const hasPermission = (permissions: AppPermission[]) => {
		return permissions.some((permission) =>
			userPermissions.some((userPermission: any) => String(userPermission) === String(permission))
		);
	};

	// Fonction pour parcourir récursivement les menus
	const findRouteInMenu = (menuItems: any[], targetRouteName: string): any => {
		for (const item of menuItems) {
			// Vérifier l'item actuel par nom de route
			if (item.to === targetRouteName) {
				return item;
			}

			// Vérifier les sous-menus
			if (item.sub && item.sub.length > 0) {
				const found = findRouteInMenu(item.sub, targetRouteName);
				if (found) return found;
			}
		}
		return null;
	};

	// Fonction pour inférer les permissions d'une route spéciale
	const inferPermissionsFromRoute = (routeName: string): AppPermission[] => {
		// Patterns de routes spéciales et leurs permissions correspondantes
		const routePatterns = [
			// Routes d'édition avec ID
			{ pattern: /-edit-id$/, permissionSuffix: "EDIT" },
			{ pattern: /-details-id$/, permissionSuffix: "VIEW" },
			{ pattern: /-show-id$/, permissionSuffix: "VIEW" },
			{ pattern: /-delete-id$/, permissionSuffix: "DELETE" },
			// Routes d'édition sans ID
			{ pattern: /-edit$/, permissionSuffix: "EDIT" },
			{ pattern: /-details$/, permissionSuffix: "VIEW" },
			{ pattern: /-show$/, permissionSuffix: "VIEW" },
			{ pattern: /-delete$/, permissionSuffix: "DELETE" },
			{ pattern: /-create$/, permissionSuffix: "ADD" },
			{ pattern: /-add$/, permissionSuffix: "ADD" },
			{ pattern: /-update$/, permissionSuffix: "EDIT" },
			{ pattern: /-exportation$/, permissionSuffix: "EXPORT" },
			{ pattern: /-statistics$/, permissionSuffix: "VIEW" },
			{ pattern: /-evaluate$/, permissionSuffix: "EVALUATE" },
			// Routes avec ID (supposées être des vues détail)
			{ pattern: /-\d+$/, permissionSuffix: "VIEW" },
			{ pattern: /\/\d+$/, permissionSuffix: "VIEW" },
		];

		for (const { pattern, permissionSuffix } of routePatterns) {
			if (pattern.test(routeName)) {
				// Extraire le module de base de la route
				const baseRoute = routeName.replace(pattern, "");

				logger.debug(`Pattern trouvé pour ${routeName}`, {
					pattern: pattern.toString(),
					permissionSuffix: permissionSuffix,
					baseRoute: baseRoute,
				});

				// Chercher les permissions dans le menu pour ce module de base
				// Essayer plusieurs patterns de nommage
				const possibleListRoutes = [
					`${baseRoute}`, // Route directe
					`${baseRoute}-list`, // Pattern standard
					`${baseRoute}s`, // Pluriel
					`list-${baseRoute}`, // Préfixe
				];

				let baseMenuItem = null;
				let foundRoute = "";

				for (const listRoute of possibleListRoutes) {
					baseMenuItem = findRouteInMenu(menu.main, listRoute);
					if (baseMenuItem) {
						foundRoute = listRoute;
						break;
					}
				}

				// Si pas trouvé avec les patterns de routes, chercher avec les alternatives
				if (!baseMenuItem) {
					// Chercher directement avec le nom du module dans les sous-menus
					const parentMenuItem = menu.main.find(
						(item: any) =>
							item.name?.toLowerCase().includes(baseRoute.split("-").pop() || "") ||
							item.subActivePaths?.includes(`/${baseRoute}`) ||
							item.subActivePaths?.includes(`/${baseRoute.replace(/-/g, "-")}`)
					);
					if (parentMenuItem?.sub) {
						baseMenuItem = parentMenuItem.sub.find(
							(subItem: any) =>
								subItem.name?.toLowerCase().includes("liste") ||
								subItem.name?.toLowerCase().includes("list") ||
								subItem.to === baseRoute
						);
						foundRoute = "menu-search";
					}
				}

				logger.debug(`Recherche du menu de base`, {
					baseRoute: baseRoute,
					possibleListRoutes: possibleListRoutes,
					foundRoute: foundRoute,
					baseMenuItemFound: !!baseMenuItem,
					baseMenuItemPermissions: baseMenuItem?.permissions,
				});

				if (baseMenuItem && baseMenuItem.permissions) {
					// Convertir les permissions de base vers le type demandé
					return baseMenuItem.permissions
						.map((perm: string) => {
							// Pour les permissions d'évaluations, utiliser la logique simple de remplacement
							if (permissionSuffix === "VIEW") {
								return perm.replace(/(add|edit|delete|export|evaluate)_/, "view_");
							} else if (permissionSuffix === "EDIT") {
								return perm.replace(/(view|add|delete|export|evaluate)_/, "edit_");
							} else if (permissionSuffix === "DELETE") {
								return perm.replace(/(view|add|edit|export|evaluate)_/, "delete_");
							} else if (permissionSuffix === "ADD") {
								return perm.replace(/(view|edit|delete|export|evaluate)_/, "add_");
							} else if (permissionSuffix === "EXPORT") {
								return perm.replace(/(view|add|edit|delete|evaluate)_/, "export_");
							} else if (permissionSuffix === "EVALUATE") {
								return perm.replace(/(view|add|edit|delete|export)_/, "evaluate_");
							}
							return perm;
						})
						.filter((perm: string) => perm.toLowerCase().includes(permissionSuffix.toLowerCase()));
				}
			}
		}

		return [];
	};

	// Chercher la route dans le menu par nom de route uniquement
	const menuItem = findRouteInMenu(menu.main, routeName);

	logger.debug(`Recherche de route dans le menu`, {
		routeName: routeName,
		menuItemFound: !!menuItem,
	});

	// Si la route n'est pas dans le menu, essayer d'inférer les permissions
	if (!menuItem) {
		const inferredPermissions = inferPermissionsFromRoute(routeName);

		if (inferredPermissions.length > 0) {
			logger.debug(`Permissions inférées pour ${routeName}`, {
				inferredPermissions: inferredPermissions,
			});

			const hasAccess = hasPermission(inferredPermissions);
			if (hasAccess) {
				logger.info(`Accès autorisé pour ${routeName} (permissions inférées)`, {
					userId: currentEmployee.id,
					inferredPermissions: inferredPermissions,
				});
			} else {
				logger.warn(`Accès refusé - Permissions inférées insuffisantes pour: ${routeName}`, {
					userId: currentEmployee.id,
					inferredPermissions: inferredPermissions,
					userPermissions: userPermissions,
				});
			}
			return hasAccess;
		}

		logger.warn(
			`Accès refusé - Route non trouvée dans le menu et permissions non inférables: ${routeName}`
		);
		return false;
	}

	logger.debug(`Route trouvée dans le menu: ${routeName}`, {
		menuItem: menuItem.name,
		requiredPermissions: menuItem.permissions,
	});

	// Si l'item a des permissions, les vérifier
	if (menuItem.permissions && menuItem.permissions.length > 0) {
		const hasAccess = hasPermission(menuItem.permissions);
		if (hasAccess) {
			logger.info(`Accès autorisé pour ${routeName}`, {
				userId: currentEmployee.id,
				menuItem: menuItem.name,
			});
		} else {
			logger.warn(`Accès refusé - Permissions insuffisantes pour: ${routeName}`, {
				userId: currentEmployee.id,
				requiredPermissions: menuItem.permissions,
				userPermissions: userPermissions,
			});
		}
		return hasAccess;
	}

	// Si pas de permissions spécifiées, autoriser l'accès
	logger.debug(`Accès autorisé - Aucune permission requise pour: ${routeName}`);
	return true;
}

/**
 * Vérifie si l'utilisateur a au moins une des permissions requises.
 */
async function hasAnyPermission(permissions: AppPermission[]): Promise<boolean> {
	if (!permissions || permissions.length === 0) {
		logger.debug("Aucune permission requise - accès autorisé");
		return true;
	}

	const globalStore = await useInitializedGlobalStore();

	if (!globalStore.isAuthenticated) {
		logger.warn("Vérification permission - Utilisateur non authentifié");
		return false;
	}

	const currentEmployee = globalStore.currentSession?.user;
	if (!currentEmployee) {
		logger.warn("Vérification permission - Employé non trouvé");
		return false;
	}

	const currentRole = currentEmployee.role;

	const userPermissions = currentRole.permissions;
	const hasAccess = permissions.some((permission) =>
		userPermissions.some((userPermission: any) => String(userPermission) === String(permission))
	);

	logger.debug(`Vérification hasAnyPermission`, {
		userId: currentEmployee.id,
		requiredPermissions: permissions,
		userPermissions: userPermissions,
		hasAccess: hasAccess,
	});

	return hasAccess;
}

/**
 * Vérifie si l'utilisateur a toutes les permissions requises.
 */
async function hasAllPermissions(permissions: AppPermission[]): Promise<boolean> {
	if (!permissions || permissions.length === 0) {
		logger.debug("Aucune permission stricte requise - accès autorisé");
		return true;
	}

	const globalStore = await useInitializedGlobalStore();

	if (!globalStore.isAuthenticated) {
		logger.warn("Vérification permission stricte - Utilisateur non authentifié");
		return false;
	}

	const currentEmployee = globalStore.currentSession?.user;
	if (!currentEmployee) {
		logger.warn("Vérification permission stricte - Employé non trouvé");
		return false;
	}

	const currentRole = currentEmployee.role;

	const userPermissions = currentRole.permissions;
	const hasAccess = permissions.every((permission) =>
		userPermissions.some((userPermission: any) => String(userPermission) === String(permission))
	);

	logger.debug(`Vérification hasAllPermissions (strict)`, {
		userId: currentEmployee.id,
		requiredPermissions: permissions,
		userPermissions: userPermissions,
		hasAccess: hasAccess,
	});

	return hasAccess;
}

/**
 * Middleware spécifique pour vérifier les permissions d'accès aux routes.
 * Utilise directement les stores pour éviter les problèmes de composables.
 * Ne s'exécute que sur les routes authentifiées (après authGuard).
 */
export async function permissionGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	logger.debug(`Permission Guard - Vérification pour: ${to.path}`, {
		from: from.path,
		to: to.path,
		name: to.name,
	});

	const globalStore = await useInitializedGlobalStore();

	// Skip si route publique ou utilisateur non connecté (géré par authGuard)
	const publicRoutes = [
		"login",
		"authentication-login",
		"forgotPassword",
		"forbidden",
		"logout",
		"applications",
		"$all",
	];
	// Skip aussi les routes de redirection automatique
	const redirectRoutes = ["/", "/index"];

	if (
		publicRoutes.includes(to.name as string) ||
		redirectRoutes.includes(to.path) ||
		!globalStore.isAuthenticated
	) {
		logger.debug(`Permission Guard - Skip route publique/redirection: ${to.path}`);
		return next();
	}

	const currentEmployee = globalStore.currentSession?.user;
	if (!currentEmployee) {
		logger.warn("Vérification permission stricte - Employé non trouvé");
		return false;
	}
	const currentRole = currentEmployee.role;

	logger.info(`Permission Guard - Vérification accès pour utilisateur: ${currentEmployee?.id}`, {
		route: to.path,
		userId: currentEmployee?.id,
		userRole: currentRole,
	});

	// 1️⃣ Vérifier l'accès via le menu de navigation
	const hasMenuAccess = await checkRoutePermissions(to.name as string);

	if (!hasMenuAccess) {
		logger.warn(`Permission Guard - ACCÈS REFUSÉ - Menu: ${to.path}`, {
			userId: currentEmployee?.id,
			reason: "Route non autorisée dans le menu",
		});
		return next({ name: "forbidden" });
	}

	// 2️⃣ Vérifier les permissions spécifiques dans les meta de la route
	const requiredPermissions = to.meta?.requiredPermissions as AppPermission[] | undefined;

	if (requiredPermissions && requiredPermissions.length > 0) {
		logger.debug(`Permission Guard - Vérification meta permissions: ${to.path}`, {
			requiredPermissions: requiredPermissions,
		});

		const hasRequiredPermissions = await hasAnyPermission(requiredPermissions);

		if (!hasRequiredPermissions) {
			logger.warn(`Permission Guard - ACCÈS REFUSÉ - Meta permissions: ${to.path}`, {
				userId: currentEmployee?.id,
				requiredPermissions: requiredPermissions,
				reason: "Permissions meta insuffisantes",
			});
			return next({ name: "forbidden" });
		}
	}

	// 3️⃣ Vérifier les permissions strictes (toutes requises)
	const strictPermissions = to.meta?.strictPermissions as AppPermission[] | undefined;

	if (strictPermissions && strictPermissions.length > 0) {
		logger.debug(`Permission Guard - Vérification permissions strictes: ${to.path}`, {
			strictPermissions: strictPermissions,
		});

		const hasStrictPermissions = await hasAllPermissions(strictPermissions);

		if (!hasStrictPermissions) {
			logger.warn(`Permission Guard - ACCÈS REFUSÉ - Permissions strictes: ${to.path}`, {
				userId: currentEmployee?.id,
				strictPermissions: strictPermissions,
				reason: "Permissions strictes insuffisantes",
			});
			return next({ name: "forbidden" });
		}
	}

	logger.info(`Permission Guard - ACCÈS AUTORISÉ: ${to.path}`, {
		userId: currentEmployee?.id,
	});
	return next();
}

/**
 * Utilitaire pour créer un guard de permission spécifique pour une route.
 *
 * @param permissions - Permissions requises (au moins une)
 * @param strict - Si true, toutes les permissions sont requises
 * @returns Guard de navigation
 *
 * @example
 * // Dans vos routes
 * beforeEnter: createPermissionGuard([AppPermissions.Administration.VIEW_USERS])
 */
export function createPermissionGuard(permissions: AppPermission[], strict: boolean = false) {
	return async (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) => {
		logger.debug(`Custom Permission Guard - ${to.path}`, {
			permissions: permissions,
			strict: strict,
		});

		const hasAccess = strict
			? await hasAllPermissions(permissions)
			: await hasAnyPermission(permissions);

		if (!hasAccess) {
			logger.warn(`Custom Permission Guard - ACCÈS REFUSÉ: ${to.path}`, {
				permissions: permissions,
				strict: strict,
				reason: `Permissions ${strict ? "strictes" : "standard"} insuffisantes`,
			});
			return next({ name: "forbidden" });
		}

		logger.info(`Custom Permission Guard - ACCÈS AUTORISÉ: ${to.path}`, {
			permissions: permissions,
			strict: strict,
		});
		return next();
	};
}
