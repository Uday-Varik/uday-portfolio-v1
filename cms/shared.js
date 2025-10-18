import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

export function createSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY/ANON_KEY environment variables.');
  }

  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

export async function upsertCollection(client, table, rows, onConflict = 'id') {
  if (!Array.isArray(rows) || rows.length === 0) {
    console.warn(`No rows provided for ${table}, skipping.`);
    return { data: [], error: null };
  }

  const { data, error } = await client.from(table).upsert(rows, {
    onConflict,
    ignoreDuplicates: false
  });

  if (error) {
    throw new Error(`Failed to upsert into ${table}: ${error.message}`);
  }

  return { data };
}

export function parseArgs(argv) {
  return argv.slice(2).reduce((acc, arg) => {
    if (arg.startsWith('--')) {
      const [key, value = true] = arg.replace(/^--/, '').split('=');
      acc[key] = value;
    }
    return acc;
  }, {});
}

export async function loadJsonFromFile(path) {
  const { readFile } = await import('node:fs/promises');
  const { resolve } = await import('node:path');
  const file = await readFile(resolve(path), 'utf-8');
  return JSON.parse(file);
}

export async function fetchJson(endpoint, token) {
  const response = await fetch(endpoint, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
