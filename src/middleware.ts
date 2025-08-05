import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Allow access to no-invitation page
  if (url.pathname === '/no-invitation') {
    return NextResponse.next();
  }
  
  // Protect admin routes
  if (url.pathname.startsWith('/admin')) {
    const isAuthenticated = request.cookies.get('admin-authenticated');
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      if (!url.pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.next();
  }
  
  // For root path, check if there's an invitation parameter
  if (url.pathname === '/') {
    const invitationCode = url.searchParams.get('invitation');
    
    // Si no hay código de invitación, redirigir a página de error
    if (!invitationCode || invitationCode.trim() === '') {
      console.log('No invitation code found, redirecting to /no-invitation');
      return NextResponse.redirect(new URL('/no-invitation', request.url));
    }
    
    // Validar el código de invitación contra la base de datos
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/invitations/validate/${invitationCode}`);
      const data = await response.json();
      
      if (!data.valid) {
        console.log('Invalid invitation code:', invitationCode);
        return NextResponse.redirect(new URL('/no-invitation', request.url));
      }
      
      // Código válido, permitir acceso
      console.log('Valid invitation code:', invitationCode);
      return NextResponse.next();
    } catch (error) {
      console.error('Error validating invitation:', error);
      // En caso de error, redirigir a no-invitation por seguridad
      return NextResponse.redirect(new URL('/no-invitation', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ]
};