import { ref, computed, watch } from "vue";

interface ValidationRule {
	test: (value: any) => boolean;
	message: string;
}

interface FieldValidation {
	rules: ValidationRule[];
	value: any;
	touched: boolean;
	errors: string[];
}

/**
 * Composable pour la validation de formulaires
 */
export function useValidation() {
	const fields = ref<Record<string, FieldValidation>>({});

	// Règles de validation communes
	const rules = {
		required: (message = "Ce champ est requis"): ValidationRule => ({
			test: (value) => {
				if (Array.isArray(value)) return value.length > 0;
				if (typeof value === "string") return value.trim().length > 0;
				return value !== null && value !== undefined && value !== "";
			},
			message,
		}),

		email: (message = "Format d'email invalide"): ValidationRule => ({
			test: (value) => {
				if (!value) return true; // Optionnel par défaut
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(value);
			},
			message,
		}),

		minLength: (min: number, message?: string): ValidationRule => ({
			test: (value) => {
				if (!value) return true; // Optionnel par défaut
				return value.toString().length >= min;
			},
			message: message || `Minimum ${min} caractères requis`,
		}),

		maxLength: (max: number, message?: string): ValidationRule => ({
			test: (value) => {
				if (!value) return true;
				return value.toString().length <= max;
			},
			message: message || `Maximum ${max} caractères autorisés`,
		}),

		min: (min: number, message?: string): ValidationRule => ({
			test: (value) => {
				if (!value && value !== 0) return true;
				return Number(value) >= min;
			},
			message: message || `La valeur doit être supérieure ou égale à ${min}`,
		}),

		max: (max: number, message?: string): ValidationRule => ({
			test: (value) => {
				if (!value && value !== 0) return true;
				return Number(value) <= max;
			},
			message: message || `La valeur doit être inférieure ou égale à ${max}`,
		}),

		pattern: (pattern: RegExp, message = "Format invalide"): ValidationRule => ({
			test: (value) => {
				if (!value) return true;
				return pattern.test(value);
			},
			message,
		}),

		custom: (testFn: (value: any) => boolean, message: string): ValidationRule => ({
			test: testFn,
			message,
		}),
	};

	// Ajouter un champ à valider
	const addField = (
		name: string,
		initialValue: any = "",
		validationRules: ValidationRule[] = []
	) => {
		fields.value[name] = {
			rules: validationRules,
			value: initialValue,
			touched: false,
			errors: [],
		};
	};

	// Mettre à jour la valeur d'un champ
	const updateField = (name: string, value: any) => {
		if (fields.value[name]) {
			fields.value[name].value = value;
			fields.value[name].touched = true;
			validateField(name);
		}
	};

	// Valider un champ spécifique
	const validateField = (name: string) => {
		const field = fields.value[name];
		if (!field) return [];

		field.errors = [];

		for (const rule of field.rules) {
			if (!rule.test(field.value)) {
				field.errors.push(rule.message);
			}
		}

		return field.errors;
	};

	// Valider tous les champs
	const validateAll = () => {
		const allErrors: Record<string, string[]> = {};
		let hasErrors = false;

		for (const fieldName in fields.value) {
			const errors = validateField(fieldName);
			if (errors.length > 0) {
				allErrors[fieldName] = errors;
				hasErrors = true;
			}
		}

		return { hasErrors, errors: allErrors };
	};

	// Marquer tous les champs comme touchés
	const touchAll = () => {
		for (const fieldName in fields.value) {
			fields.value[fieldName].touched = true;
		}
	};

	// Reset de la validation
	const reset = () => {
		for (const fieldName in fields.value) {
			fields.value[fieldName].touched = false;
			fields.value[fieldName].errors = [];
		}
	};

	// Calculé pour savoir si le formulaire est valide
	const isValid = computed(() => {
		return Object.values(fields.value).every((field) => field.errors.length === 0);
	});

	// Calculé pour savoir si le formulaire a été touché
	const isTouched = computed(() => {
		return Object.values(fields.value).some((field) => field.touched);
	});

	// Obtenir les erreurs d'un champ
	const getFieldErrors = (name: string) => {
		return fields.value[name]?.errors || [];
	};

	// Obtenir la première erreur d'un champ
	const getFirstFieldError = (name: string) => {
		const errors = getFieldErrors(name);
		return errors.length > 0 ? errors[0] : "";
	};

	// Vérifier si un champ a des erreurs
	const hasFieldError = (name: string) => {
		return getFieldErrors(name).length > 0;
	};

	// Fonction helper pour les composants Vuetify
	const getVuetifyRules = (name: string) => {
		const field = fields.value[name];
		if (!field) return [];

		return field.rules.map((rule) => (value: any) => {
			return rule.test(value) || rule.message;
		});
	};

	return {
		fields: readonly(fields),
		rules,
		addField,
		updateField,
		validateField,
		validateAll,
		touchAll,
		reset,
		isValid,
		isTouched,
		getFieldErrors,
		getFirstFieldError,
		hasFieldError,
		getVuetifyRules,
	};
}
