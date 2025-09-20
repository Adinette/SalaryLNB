/**
 * Composable pour les styles de tables modernes 
 * Fournit des classes CSS et des utilitaires pour les listes
 */

export const useModernTableStyles = () => {
	// Classes CSS pour les tables
	const tableClasses = {
		table: "table table-striped table-vcenter table-",
		responsiveWrapper: "table-responsive",
	};

	// Classes pour les badges/chips
	const badgeClasses = {
		primary: "badge badge- bg-primary-light",
		success: "badge badge- bg-success-light",
		danger: "badge badge- bg-danger-light",
		warning: "badge badge- bg-warning-light",
	};

	// Classes pour les boutons d'action
	const buttonClasses = {
		group: "btn-group btn-group-",
		edit: "btn btn-sm btn-alt-secondary",
		delete: "btn btn-sm btn-alt-secondary text-error",
	};

	// Classes pour les colonnes d'information
	const infoColumnClasses = {
		wrapper: "info-column-",
		name: "info-name",
		detail: "info-detail",
		badge: "info-badge",
	};

	// Icônes modernes
	const icons = {
		email: "fa fa-envelope icon-",
		phone: "fa fa-phone icon-",
		building: "fa fa-building icon-",
		calendar: "fa fa-calendar icon-",
		edit: "fa fa-fw fa-pencil-alt",
		delete: "fa fa-fw fa-times",
		refresh: "ri-refresh-line",
		add: "ri-add-circle-fill",
		loading: "fa fa-fw fa-spinner fa-spin loading-",
		empty: "fa fa-fw fa-exclamation-triangle text-warning loading-",
	};

	// États de chargement standardisés
	const loadingStates = {
		empty: {
			icon: icons.empty,
			message: "Aucun élément trouvé.",
		},
		loading: {
			icon: icons.loading,
			message: "Chargement en cours...",
		},
	};

	// Configuration des headers de table
	const createHeaders = (config: Array<{ label: string; width?: string; align?: string }>) => {
		return config.map((header) => ({
			label: header.label,
			style: {
				width: header.width || "auto",
				textAlign: header.align || "left",
				color: "white !important",
				fontWeight: "600 !important",
			},
		}));
	};

	// Utilitaire pour formater les dates
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("fr-FR");
	};

	// Utilitaire pour les badges de statut
	const getStatusBadge = (isActive: boolean) => ({
		class: isActive ? badgeClasses.success : badgeClasses.danger,
		text: isActive ? "Actif" : "Inactif",
	});

	return {
		tableClasses,
		badgeClasses,
		buttonClasses,
		infoColumnClasses,
		icons,
		loadingStates,
		createHeaders,
		formatDate,
		getStatusBadge,
	};
};
