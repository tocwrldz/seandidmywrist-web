/**
 * Supabase Client Integration
 * Connects to live Supabase project when VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are provided.
 * Provides graceful fallback when running in sandbox/preview without keys configured.
 */

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  !SUPABASE_URL.includes('your-project-id')
);

// Configuration state observer
export function getBackendStatus() {
  return {
    configured: isSupabaseConfigured,
    url: SUPABASE_URL ? SUPABASE_URL.replace(/(https?:\/\/)(.{4}).+(.{4}\.supabase\.co)/, '$1$2...$3') : 'Not Set',
    hasAnonKey: Boolean(SUPABASE_ANON_KEY),
    mode: isSupabaseConfigured ? 'LIVE_SUPABASE_DATABASE' : 'LOCAL_STORAGE_HYBRID_DEMO'
  };
}
