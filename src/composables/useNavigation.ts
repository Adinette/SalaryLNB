import menu from "@/data/menu";
import { useCurrentSession } from "./useCurrentSession";
import { type AppPermission, AppPermissions } from "@/modules/permissions/enums/permission_enum";
import { computed } from "vue";

export const useNavigation = () => {
	const routeName = useRoute().path;
	const logger = createLogger("permissionGuard");

	const { currentSession, fetchCurrentSession } = useCurrentSession();
	const navigation = menu.main;

	const hasPermission = (permissions: AppPermission[]) => {
		if (!currentSession.value) return false;

		const currentEmployee = currentSession.value.user;
		const currentRole = currentEmployee.role;

		const userPermissions = currentRole.permissions;
		logger.debug(`Vérification permissions pour ${routeName}`, {
			userId: currentEmployee.id,
			userRole: currentRole,
			userPermissions: userPermissions,
		});
		return permissions.some((permission) =>
			userPermissions.some((userPermission: any) => String(userPermission) === String(permission))
		);
	};

	const hasAnyPermission = (permissions: AppPermission[]) => {
		if (!permissions || permissions.length === 0) return true;
		return hasPermission(permissions);
	};

	const hasAllPermissions = (permissions: AppPermission[]) => {
		if (!currentSession.value) return false;
		if (!permissions || permissions.length === 0) return true;

		const currentEmployee = currentSession.value.user;
		const currentRole = currentEmployee.role;

		const userPermissions = currentRole.permissions;

		return permissions.every((permission) =>
			userPermissions.some((userPermission: any) => String(userPermission) === String(permission))
		);
	};

	const filterMenuItemsByPermissions = (menuItems: any[]) => {
		return menuItems.filter((item) => {
			// Si c'est un heading, vérifier les permissions ou permettre par défaut
			if (item.heading) {
				return !item.permissions || hasAnyPermission(item.permissions);
			}

			// Vérifier les permissions de l'item principal
			if (item.permissions && !hasAnyPermission(item.permissions)) {
				return false;
			}

			// Si l'item a des sous-menus, les filtrer récursivement
			if (item.sub && item.sub.length > 0) {
				item.sub = filterMenuItemsByPermissions(item.sub);
				// Garder l'item parent s'il a au moins un sous-menu visible
				return item.sub.length > 0;
			}

			return true;
		});
	};

	// Navigation filtrée basée sur les permissions de l'utilisateur
	const filteredNavigation = computed(() => {
		if (!currentSession.value) return [];
		return filterMenuItemsByPermissions([...navigation]);
	});

	// Vérifier si un menu item spécifique est visible
	const isMenuItemVisible = (item: any) => {
		if (item.heading) {
			return !item.permissions || hasAnyPermission(item.permissions);
		}
		return !item.permissions || hasAnyPermission(item.permissions);
	};

	// Obtenir tous les items de menu accessibles (plat)
	const accessibleMenuItems = computed(() => {
		const flattenItems = (items: any[]): any[] => {
			return items.reduce((acc, item) => {
				if (!item.heading && isMenuItemVisible(item)) {
					acc.push(item);
					if (item.sub) {
						acc.push(...flattenItems(item.sub));
					}
				}
				return acc;
			}, []);
		};

		return flattenItems(filteredNavigation.value);
	});

	// Vérifier si l'utilisateur peut accéder à une route
	const canAccessRoute = (routeName: string) => {
		return accessibleMenuItems.value.some((item) => item.to === routeName);
	};

	// Obtenir le premier menu accessible (pour redirection par défaut)
	const firstAccessibleMenu = computed(() => {
		const firstItem = accessibleMenuItems.value.find((item) => item.to);
		return firstItem?.to || "/";
	});

	return {
		// State
		navigation: filteredNavigation,
		accessibleMenuItems,
		firstAccessibleMenu,

		// Methods
		hasPermission,
		hasAnyPermission,
		hasAllPermissions,
		isMenuItemVisible,
		canAccessRoute,
		fetchCurrentSession,

		// Utils
		filterMenuItemsByPermissions,
	};
};
