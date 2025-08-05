import { NextRequest, NextResponse } from 'next/server';
import { createServerAdminClient } from '@/lib/supabase/server-admin';

// Actualizar RSVP
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerAdminClient();
  const body = await request.json();
  
  const { 
    name, 
    attendance, 
    guests_count,
    dietary_restrictions,
    message 
  } = body;
  
  // Verificar fecha límite
  const deadline = new Date('2025-09-16');
  if (new Date() > deadline) {
    return NextResponse.json(
      { error: 'La fecha límite para modificar confirmaciones ha pasado' },
      { status: 400 }
    );
  }
  
  // Obtener el RSVP actual para verificar que existe
  const { data: currentRsvp, error: fetchError } = await supabase
    .from('rsvps')
    .select('*, invitations!inner(max_guests)')
    .eq('id', id)
    .single();
  
  if (fetchError || !currentRsvp) {
    return NextResponse.json(
      { error: 'Confirmación no encontrada' },
      { status: 404 }
    );
  }
  
  // Verificar que no exceda el máximo de invitados
  if (attendance === 'yes' && guests_count > currentRsvp.invitations.max_guests) {
    return NextResponse.json(
      { error: `El máximo de invitados para esta invitación es ${currentRsvp.invitations.max_guests}` },
      { status: 400 }
    );
  }
  
  // Actualizar RSVP
  const { data: updatedRsvp, error: updateError } = await supabase
    .from('rsvps')
    .update({
      name,
      attendance,
      guests_count: attendance === 'yes' ? guests_count : 0,
      dietary_restrictions,
      message,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (updateError) {
    return NextResponse.json(
      { error: 'Error al actualizar confirmación' },
      { status: 500 }
    );
  }
  
  return NextResponse.json({ success: true, rsvp: updatedRsvp });
}

// Eliminar RSVP
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createServerAdminClient();
  
  // Verificar fecha límite
  const deadline = new Date('2025-09-16');
  if (new Date() > deadline) {
    return NextResponse.json(
      { error: 'La fecha límite para modificar confirmaciones ha pasado' },
      { status: 400 }
    );
  }
  
  // Obtener el RSVP para conocer el invitation_id
  const { data: rsvp, error: fetchError } = await supabase
    .from('rsvps')
    .select('invitation_id')
    .eq('id', id)
    .single();
  
  if (fetchError || !rsvp) {
    return NextResponse.json(
      { error: 'Confirmación no encontrada' },
      { status: 404 }
    );
  }
  
  // Eliminar RSVP
  const { error: deleteError } = await supabase
    .from('rsvps')
    .delete()
    .eq('id', id);
  
  if (deleteError) {
    return NextResponse.json(
      { error: 'Error al eliminar confirmación' },
      { status: 500 }
    );
  }
  
  // Actualizar invitación como no usada
  await supabase
    .from('invitations')
    .update({ is_used: false })
    .eq('id', rsvp.invitation_id);
  
  return NextResponse.json({ success: true });
}