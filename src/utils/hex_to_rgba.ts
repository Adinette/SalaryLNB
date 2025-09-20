/**
 * Convertit une couleur hexadécimale en format RGBA avec transparence
 */
export const hexToRgba = (hex: string, opacity: number): string => {
	// Si la couleur est déjà au format rgba, on la retourne telle quelle
	if (hex.startsWith("rgba")) return hex;

	// Enlever le # si présent
	let color = hex.replace("#", "");

	// Convertir en format rgb
	let r = parseInt(color.substring(0, 2), 16);
	let g = parseInt(color.substring(2, 4), 16);
	let b = parseInt(color.substring(4, 6), 16);

	// Retourner au format rgba
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
