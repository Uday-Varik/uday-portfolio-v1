const processEnv = typeof process !== 'undefined' && process.env ? process.env : {};
const globalEnv = typeof globalThis !== 'undefined' ? globalThis : {};

export const SUPABASE_URL =
  globalEnv.SUPABASE_URL ?? processEnv.SUPABASE_URL ?? 'https://your-project-ref.supabase.co';
export const SUPABASE_ANON_KEY =
  globalEnv.SUPABASE_ANON_KEY ?? processEnv.SUPABASE_ANON_KEY ?? 'your-public-anon-key';
export const SUPABASE_SERVICE_ROLE_KEY =
  processEnv.SUPABASE_SERVICE_ROLE_KEY ?? globalEnv.SUPABASE_SERVICE_ROLE_KEY ?? 'your-service-role-key';
