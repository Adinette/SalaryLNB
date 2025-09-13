export function extractMonthAndYear(dateString: string): { month: string; year: string } {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();

  // Utiliser Intl pour obtenir le mois en texte (ou en chiffre)
const rawMonth = date.toLocaleString('fr-FR', { month: 'long' });
const month = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
  // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // ex: "09"

  return { month, year };
}

