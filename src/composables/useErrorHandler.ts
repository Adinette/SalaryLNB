import { readonly, ref, watch } from "vue";
import { toast } from "../utils/toast";
import { createLogger } from "../utils/logger";

interface ErrorConfig {
	showToast?: boolean;
	toastMessage?: string;
	logLevel?: "error" | "warn" | "info";
	context?: string;
}

/**
 * Composable pour la gestion uniforme des erreurs
 */
export function useErrorHandler(defaultContext = "Unknown") {
	const logger = createLogger(defaultContext);
	const errors = ref<
		Array<{
			id: string;
			message: string;
			details?: any;
			timestamp: Date;
			context: string;
		}>
	>([]);

	const handleError = (error: any, config: ErrorConfig = {}) => {
		const { showToast = true, toastMessage, logLevel = "error", context = defaultContext } = config;

		// Générer un ID unique pour l'erreur
		const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

		// Extraire le message d'erreur
		let message = "Une erreur inattendue s'est produite";
		let details = error;

		if (error instanceof Error) {
			message = error.message;
			details = {
				name: error.name,
				stack: error.stack,
			};
		} else if (typeof error === "string") {
			message = error;
		} else if (error?.message) {
			message = error.message;
		}

		// Stocker l'erreur
		errors.value.push({
			id: errorId,
			message,
			details,
			timestamp: new Date(),
			context,
		});

		// Logger l'erreur
		logger[logLevel](`Error in ${context}:`, { message, details, errorId });

		// Afficher le toast si nécessaire
		if (showToast) {
			const displayMessage = toastMessage || message;
			toast.error(displayMessage);
		}

		return errorId;
	};

	const handleApiError = (error: any, operation = "operation") => {
		let message = `Erreur lors de ${operation}`;

		if (error?.response?.data?.message) {
			message = error.response.data.message;
		} else if (error?.message) {
			message = error.message;
		}

		return handleError(error, {
			toastMessage: message,
			context: `API_${operation}`,
		});
	};

	const clearErrors = () => {
		errors.value = [];
	};

	const removeError = (errorId: string) => {
		const index = errors.value.findIndex((e) => e.id === errorId);
		if (index > -1) {
			errors.value.splice(index, 1);
		}
	};

	// Nettoyage automatique des anciennes erreurs (garde les 50 dernières)
	const cleanupOldErrors = () => {
		if (errors.value.length > 50) {
			errors.value = errors.value.slice(-50);
		}
	};

	// Nettoyer automatiquement toutes les 100 erreurs
	watch(
		() => errors.value.length,
		(newLength) => {
			if (newLength > 100) {
				cleanupOldErrors();
			}
		}
	);

	return {
		errors: readonly(errors),
		handleError,
		handleApiError,
		clearErrors,
		removeError,
		cleanupOldErrors,
	};
}
