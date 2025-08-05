export function generateWhatsAppMessage(guestName: string, invitationCode: string, maxGuests: number = 2): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bodasofibayo.vercel.app';
  const invitationUrl = `${siteUrl}/?invitation=${invitationCode}`;
  
  const firstName = guestName.split(' ')[0];
  
  const isCouple = guestName.includes(' y ') || guestName.includes(' & ');
  const greeting = isCouple ? `Hola ${guestName} ✨` : `Hola ${firstName} ✨`;
  
  const message = `${greeting}

*Sofía & Oswaldo* 💍

_"El amor se celebra en los pequeños detalles y en la compañía de quienes más amamos."_

Con muchísima ilusión, queremos compartir este día tan especial a tu lado.
Será una noche para recordar, llena de amor, alegría y momentos inolvidables.

Para que todos puedan disfrutar con tranquilidad:
*La celebración será exclusivamente para adultos. NO NIÑOS* 🚫

👗 *Código de vestimenta:* Formal y elegante — *COLOR NEGRO* 🖤

¡Gracias por acompañarnos y ser parte de nuestra historia!

*Invitación para:* ${guestName}
*Válida para:* ${maxGuests} ${maxGuests === 1 ? 'persona' : 'personas'}

${invitationUrl}

_Por favor, confirma tu asistencia antes del 16 de septiembre de 2025_`;

  return message;
}

export async function copyWhatsAppMessage(guestName: string, invitationCode: string, maxGuests: number = 2): Promise<boolean> {
  try {
    const message = generateWhatsAppMessage(guestName, invitationCode, maxGuests);
    await navigator.clipboard.writeText(message);
    return true;
  } catch (error) {
    return false;
  }
}

export function generateWhatsAppLink(guestName: string, invitationCode: string, maxGuests: number = 2, phoneNumber?: string): string {
  const message = generateWhatsAppMessage(guestName, invitationCode, maxGuests);
  const encodedMessage = encodeURIComponent(message);
  
  if (phoneNumber) {
    const cleanPhone = phoneNumber.replace(/[^\d]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  } else {
    return `https://wa.me/?text=${encodedMessage}`;
  }
}