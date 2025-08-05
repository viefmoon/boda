import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from './database.types';

/**
 * Cliente de Supabase para operaciones administrativas en el servidor
 * Usa el service role key para bypass completo de RLS
 * SOLO usar en API routes y Server Components
 */
export async function createServerAdminClient() {
  const cookieStore = await cookies();
  
  // Usar service role key si está disponible, sino usar anon key
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component - ignore cookie setting errors
          }
        },
      },
    }
  );
}