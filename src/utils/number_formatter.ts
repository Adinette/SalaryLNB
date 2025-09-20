/**
 * Formate un nombre selon une locale donnée, avec options personnalisables.
 *
 * @param value - Le nombre à formater.
 * @param locale - La locale utilisée pour le formatage (par défaut : 'en-US').
 * @param options - Options supplémentaires de formatage (minimumFractionDigits, etc.).
 * @returns Le nombre formaté en tant que chaîne de caractères.
 */
export const numberFormatter = (
	value: number,
	locale: string = "en-US",
	options: Intl.NumberFormatOptions = {}
): string => {
	const formatter = new Intl.NumberFormat(locale, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
		...options,
	});
	return formatter.format(value);
};
