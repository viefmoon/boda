import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  if (url.pathname === '/no-invitation') {
    return NextResponse.next();
  }
  
  if (url.pathname.startsWith('/admin')) {
    const isAuthenticated = request.cookies.get('admin-authenticated');
    
    if (!isAuthenticated) {
      if (!url.pathname.startsWith('/admin/login')) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    }
    return NextResponse.next();
  }
  
  if (url.pathname === '/') {
    const invitationCode = url.searchParams.get('invitation');
    
    if (!invitationCode || invitationCode.trim() === '') {
      return NextResponse.redirect(new URL('/no-invitation', request.url));
    }
    
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/invitations/validate/${invitationCode}`);
      const data = await response.json();
      
      if (!data.valid) {
        return NextResponse.redirect(new URL('/no-invitation', request.url));
      }
      
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/no-invitation', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ]
};