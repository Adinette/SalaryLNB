import { DateTime } from "luxon";

/**
 * Composable pour le formatage unifié des données
 */
export function useFormatting() {
	// Formatage des dates
	const formatDate = (
		date: Date | string | null,
		format: "short" | "long" | "relative" = "short"
	) => {
		if (!date) return "Non défini";

		const dt = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);

		switch (format) {
			case "long":
				return dt.toLocaleString(DateTime.DATE_FULL);
			case "relative":
				return dt.toRelative({ locale: "fr" }) || "Date invalide";
			default:
				return dt.toLocaleString(DateTime.DATE_SHORT);
		}
	};

	const formatDateTime = (date: Date | string | null) => {
		if (!date) return "Non défini";

		const dt = typeof date === "string" ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
		return dt.toLocaleString(DateTime.DATETIME_SHORT);
	};

	// Formatage des nombres
	const formatNumber = (value: number | null, decimals: number = 0) => {
		if (value === null || value === undefined) return "0";
		return new Intl.NumberFormat("fr-FR", {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		}).format(value);
	};

	const formatPercentage = (value: number | null, decimals: number = 1) => {
		if (value === null || value === undefined) return "0%";
		return `${formatNumber(value, decimals)}%`;
	};

	// Formatage des statuts
	const getStatusConfig = (status: string) => {
		const configs = {
			completed: { color: "success", text: "Terminé", icon: "mdi-check-circle" },
			in_progress: { color: "warning", text: "En cours", icon: "mdi-clock" },
			pending: { color: "info", text: "En attente", icon: "mdi-pause-circle" },
			cancelled: { color: "error", text: "Annulé", icon: "mdi-cancel" },
			draft: { color: "grey", text: "Brouillon", icon: "mdi-file-document-outline" },
		};

		return (
			configs[status as keyof typeof configs] || {
				color: "grey",
				text: status,
				icon: "mdi-help-circle",
			}
		);
	};

	// Formatage des noms complets
	const formatFullName = (firstName?: string, lastName?: string) => {
		if (!firstName && !lastName) return "Utilisateur inconnu";
		return `${firstName || ""} ${lastName || ""}`.trim();
	};

	// Formatage des initiales
	const formatInitials = (firstName?: string, lastName?: string) => {
		const first = firstName?.charAt(0)?.toUpperCase() || "";
		const last = lastName?.charAt(0)?.toUpperCase() || "";
		return `${first}${last}` || "XX";
	};

	return {
		formatDate,
		formatDateTime,
		formatNumber,
		formatPercentage,
		getStatusConfig,
		formatFullName,
		formatInitials,
	};
}
