// src/utils/formatDate.ts
//--------------------------------------------------------------

/**
 * Restituisce la data in formato "gg/mm/aaaa hh:mm"
 * (sempre con due cifre per giorno, mese, ora e minuto).
 */
export function formatItalianDateTime(date: Date): string {
  // Con Intl.DateTimeFormat è facile mantenere localizzazione e zero-padding
  const formatter = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // orario a 24 h
  });

  // Intl restituisce automaticamente "gg/mm/aaaa, hh:mm"
  // Eliminiamo la virgola per ottenere "gg/mm/aaaa hh:mm"
  return formatter.format(date).replace(",", ""); // "27/04/2025 15:42"
}

//--------------------------------------------------------------

// Default export opzionale (se preferisci)
export default formatItalianDateTime;
