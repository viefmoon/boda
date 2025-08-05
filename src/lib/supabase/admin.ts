import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './database.types';

/**
 * Cliente de Supabase para operaciones administrativas
 * Usa el service role key para bypass de RLS
 * IMPORTANTE: Solo usar en componentes del lado del servidor o API routes
 */
export function createAdminClient() {
  // En el cliente, seguimos usando anon key por seguridad
  // El service role key solo debe usarse en el servidor
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}