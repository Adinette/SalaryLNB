export function extractMonthAndYear(dateString: string): { month: string; year: string } {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();

  // Utiliser Intl pour obtenir le mois en texte (ou en chiffre)
  const month = date.toLocaleString('fr-FR', { month: 'long' }); // ex: "septembre"
  // const month = (date.getMonth() + 1).toString().padStart(2, '0'); // ex: "09"

  return { month, year };
}

