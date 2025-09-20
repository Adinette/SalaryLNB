import { appLocalesMapping } from "@/locales/appLocalesMapping";

appLocalesMapping;

// 👉 IsEmpty
export const isEmpty = (value: unknown): boolean => {
	if (value === null || value === undefined || value === "") return true;

	return !!(Array.isArray(value) && value.length === 0);
};

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value: unknown): value is undefined | null => {
	return value === null || value === undefined;
};

// 👉 IsEmptyArray
export const isEmptyArray = (arr: unknown): boolean => {
	return Array.isArray(arr) && arr.length === 0;
};

// 👉 IsObject
export const isObject = (obj: unknown): obj is Record<string, unknown> =>
	obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);

// 👉 IsToday
export const isToday = (date: Date) => {
	const today = new Date();

	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
	if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
		return "Ce champ est requis";

	return !!String(value).trim().length || "Ce champ est requis";
};

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (Array.isArray(value))
		return (
			value.every((val) => re.test(String(val))) ||
			"Ce champ doit contenir une adresse email valide"
		);

	return re.test(String(value)) || "Ce champ doit contenir une adresse email valide";
};

// 👉 Password Validator
export const passwordValidator = (password: string) => {
	const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{12,}/;

	const validPassword = regExp.test(password);

	return (
		validPassword ||
		"Le mot de passe doit contenir au moins une majuscule, une minuscule, un caractère spécial et un chiffre d'au moins 12 caractères"
	);
};

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>
	value === target || "Le champ de confirmation du mot de passe ne correspond pas";

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
	const valueAsNumber = Number(value);

	return (
		(Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
		`Entrer un nombre entre ${min} et ${max}`
	);
};

//Number validator 
export const numberValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const regex = /^-?\d+(?:[.,]\d+)?$/;

  if (Array.isArray(value)) {
    return value.every((val) => regex.test(String(val))) || "Ce champ doit être un nombre";
  }

  return regex.test(String(value)) || "Ce champ doit être un nombre";
};

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	if (Array.isArray(value))
		return (
			value.every((val) => /^-?[0-9]+$/.test(String(val))) || "Ce champ doit être un nombre entier"
		);

	return /^-?[0-9]+$/.test(String(value)) || "Ce champ doit être un nombre entier";
};

// 👉 Regex Validator
export const regexValidator = (value: unknown, regex: RegExp | string): string | boolean => {
	if (isEmpty(value)) return true;

	let regeX = regex;
	if (typeof regeX === "string") regeX = new RegExp(regeX);

	if (Array.isArray(value)) return value.every((val) => regexValidator(val, regeX));

	return regeX.test(String(value)) || "Le format de champ est invalide";
};

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	return (
		/^[A-Z]*$/i.test(String(value)) || "Le champ ne peut contenir que des caractères alphabétiques"
	);
};

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	const re = /^(https?):\/\/[^\s$.?#].[^\s]*$/;

	return re.test(String(value)) || "Le lien est invalide";
};

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
	if (isEmpty(value)) return true;

	return (
		String(value).length === length || `Le champ doit contenir exactement ${length} caractères`
	);
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	const valueAsString = String(value);

	return (
		/^[0-9A-Z_-]*$/i.test(valueAsString) ||
		"Le champ ne peut contenir que des caractères alphanumériques, des tirets et des underscores"
	);
};

export const importExcelFileValidator = (fileList: FileList) => {
	if (isEmpty(fileList)) return "Veuillez sélectionner un fichier";

	// Size should be less than 2MB
	if (fileList[0].size > 2097152) return "La taille du fichier ne doit pas dépasser 2MB";

	const validTypes = [
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.ms-excel",
	];
	if (!validTypes.includes(fileList[0].type))
		return "Le fichier doit être un fichier Excel (.xlsx ou .xls)";

	return true;
};

export const phoneValidator = (value: unknown) => {
	if (isEmpty(value)) return true;

	// Le téléphone doit être au format "229 01 23 45 67 89"
	const re = /^229\s01\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/;

	if (Array.isArray(value))
		return value.every((val) => re.test(String(val))) || "Le champ téléphone n'est pas valide";

	return (
		re.test(String(value)) || "Le champ téléphone n'est pas valide. Format : 229 01 23 45 67 89"
	);
};


