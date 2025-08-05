import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  
  // Verificar contraseña contra la variable de entorno
  if (password === process.env.ADMIN_PASSWORD) {
    // Establecer cookie de autenticación
    const cookieStore = await cookies();
    cookieStore.set('admin-authenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 horas
    });
    
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}