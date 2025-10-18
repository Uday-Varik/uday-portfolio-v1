import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/env.js';

let createSupabaseClient;

if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  ({ createClient: createSupabaseClient } = await import('https://esm.sh/@supabase/supabase-js@2.43.4'));
} else {
  try {
    ({ createClient: createSupabaseClient } = await import('@supabase/supabase-js'));
  } catch (error) {
    createSupabaseClient = () => {
      throw new Error('Supabase client is unavailable in this environment.');
    };
  }
}

const missingEnv =
  !SUPABASE_URL ||
  SUPABASE_URL.includes('your-project-ref') ||
  !SUPABASE_ANON_KEY ||
  SUPABASE_ANON_KEY.includes('your-public-anon-key');

function createDisabledClient() {
  return {
    from() {
      throw new Error('Supabase client is not configured. Provide SUPABASE_URL and SUPABASE_ANON_KEY values.');
    }
  };
}

export const supabase = missingEnv
  ? createDisabledClient()
  : createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    });
