import { DateTime, Settings } from 'luxon'

// Définition de la locale française
Settings.defaultLocale = 'fr'
Settings.defaultZone = 'Africa/Porto-Novo'

// Configuration des formats personnalisés
const luxonFormats = {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'dd/MM/yyyy',
    LL: 'd MMMM yyyy',
    LLL: 'd MMMM yyyy HH:mm',
    LLLL: 'EEEE d MMMM yyyy HH:mm',
  },
  relativeTime: (from: DateTime, _: DateTime) => {
    const diff = from.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'seconds']).toObject()
    if (diff.years)
      return `il y a ${Math.abs(diff.years)} an${diff.years > 1 ? 's' : ''}`
    if (diff.months)
      return `il y a ${Math.abs(diff.months)} mois`
    if (diff.days)
      return `il y a ${Math.abs(diff.days)} jour${diff.days > 1 ? 's' : ''}`
    if (diff.hours)
      return `il y a ${Math.abs(diff.hours)} heure${diff.hours > 1 ? 's' : ''}`
    if (diff.minutes)
      return `il y a ${Math.abs(diff.minutes)} minute${diff.minutes > 1 ? 's' : ''}`

    return 'il y a quelques secondes'
  },
}

export { DateTime }
export { luxonFormats }
