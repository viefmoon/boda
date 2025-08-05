import { NextRequest, NextResponse } from 'next/server';
import { createServerAdminClient } from '@/lib/supabase/server-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  try {
    const supabase = await createServerAdminClient();
    
    // Buscar invitación por código
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('id, invitation_code')
      .eq('invitation_code', code)
      .single();
    
    if (error || !invitation) {
      return NextResponse.json(
        { valid: false },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { valid: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { valid: false },
      { status: 200 }
    );
  }
}