import { NextRequest, NextResponse } from 'next/server';
import { createServerAdminClient } from '@/lib/supabase/server-admin';

export async function POST(request: NextRequest) {
  const supabase = await createServerAdminClient();
  const body = await request.json();
  
  const { 
    invitation_code, 
    name, 
    attendance, 
    guests_count,
    dietary_restrictions,
    message 
  } = body;
  
  // Verificar que la invitación existe
  const { data: invitation, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('invitation_code', invitation_code)
    .single();
  
  if (invError || !invitation) {
    return NextResponse.json(
      { error: 'Invitación inválida' },
      { status: 400 }
    );
  }
  
  // Verificar que no se haya usado ya
  const { data: existingRsvp } = await supabase
    .from('rsvps')
    .select('*')
    .eq('invitation_id', invitation.id)
    .single();
  
  if (existingRsvp) {
    return NextResponse.json(
      { error: 'Esta invitación ya fue confirmada' },
      { status: 400 }
    );
  }
  
  // Verificar que no exceda el máximo de invitados
  if (attendance === 'yes' && guests_count > invitation.max_guests) {
    return NextResponse.json(
      { error: `El máximo de invitados para esta invitación es ${invitation.max_guests}` },
      { status: 400 }
    );
  }
  
  // Crear RSVP
  const { data: rsvp, error: rsvpError } = await supabase
    .from('rsvps')
    .insert({
      invitation_id: invitation.id,
      name,
      attendance,
      guests_count: attendance === 'yes' ? guests_count : 0,
      dietary_restrictions,
      message
    })
    .select()
    .single();
  
  if (rsvpError) {
    return NextResponse.json(
      { error: 'Error al guardar confirmación' },
      { status: 500 }
    );
  }
  
  // Marcar invitación como usada
  await supabase
    .from('invitations')
    .update({ is_used: true })
    .eq('id', invitation.id);
  
  return NextResponse.json({ success: true, rsvp });
}