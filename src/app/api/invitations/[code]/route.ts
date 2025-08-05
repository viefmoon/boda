import { NextRequest, NextResponse } from 'next/server';
import { createServerAdminClient } from '@/lib/supabase/server-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const supabase = await createServerAdminClient();
  
  // Buscar invitación por código
  const { data: invitation, error } = await supabase
    .from('invitations')
    .select('*')
    .eq('invitation_code', code)
    .single();
  
  if (error || !invitation) {
    return NextResponse.json(
      { error: 'Invitación no encontrada' },
      { status: 404 }
    );
  }
  
  // Verificar si ya fue usada
  const { data: existingRsvp } = await supabase
    .from('rsvps')
    .select('id, name, attendance, guests_count, dietary_restrictions, message')
    .eq('invitation_id', invitation.id)
    .single();
  
  return NextResponse.json({
    invitation,
    hasResponded: !!existingRsvp,
    rsvp: existingRsvp
  });
}