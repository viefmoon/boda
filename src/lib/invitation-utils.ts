/**
 * Genera un código de invitación seguro basado en el nombre del invitado
 * Formato: [2 primeras letras del nombre][4 caracteres aleatorios][2 números]
 * Ejemplo: JU7K9X42 (8 caracteres total, sin guiones)
 */
export function generateSecureInvitationCode(guestName: string): string {
  // Obtener las primeras 2 letras del nombre (sin espacios ni caracteres especiales)
  const cleanName = guestName
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .substring(0, 2)
    .padEnd(2, 'X'); // Si el nombre es muy corto, rellenar con X
  
  // Generar 4 caracteres aleatorios (letras y números)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomChars = '';
  for (let i = 0; i < 4; i++) {
    randomChars += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Generar 2 números aleatorios
  const randomNumbers = Math.floor(Math.random() * 90 + 10); // Entre 10 y 99
  
  // Retornar código de 8 caracteres sin guiones
  return `${cleanName}${randomChars}${randomNumbers}`;
}

/**
 * Verifica si una fecha está antes de la fecha límite
 */
export function isBeforeDeadline(deadlineDate: string): boolean {
  const deadline = new Date(deadlineDate);
  const now = new Date();
  return now <= deadline;
}

/**
 * Formatea una fecha para mostrar
 */
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}