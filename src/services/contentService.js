import { supabase } from '../lib/supabaseClient.js';

const cache = new Map();
let client = supabase;

function getCacheKey(table, options) {
  return `${table}:${JSON.stringify(options ?? {})}`;
}

function applyFilters(query, filters = []) {
  return filters.reduce((acc, filter) => {
    const { column, operator = 'eq', value } = filter;
    if (typeof acc[operator] !== 'function') {
      throw new Error(`Unsupported filter operator: ${operator}`);
    }
    return acc[operator](column, value);
  }, query);
}

export async function fetchRecords(table, { filters = [], order, limit, single = false } = {}) {
  const cacheKey = getCacheKey(table, { filters, order, limit, single });
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  let query = client.from(table).select('*');

  if (filters.length) {
    query = applyFilters(query, filters);
  }

  if (order?.column) {
    query = query.order(order.column, { ascending: order.ascending ?? true, nullsFirst: order.nullsFirst ?? false });
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = single ? await query.single() : await query;

  if (error) {
    console.error(`Failed to fetch from ${table}:`, error.message);
    throw error;
  }

  cache.set(cacheKey, data);
  return data;
}

export function __setSupabaseClient(mockClient) {
  client = mockClient;
  cache.clear();
}

export function __resetSupabaseClient() {
  client = supabase;
  cache.clear();
}

export async function fetchSiteSettings() {
  return fetchRecords('site_settings', { single: true });
}

export async function fetchNavigationLinks() {
  return fetchRecords('navigation_links', { order: { column: 'position', ascending: true } });
}

export async function fetchHomePage() {
  return fetchRecords('pages', {
    filters: [{ column: 'slug', value: 'home' }],
    single: true
  });
}

export async function fetchFeaturedProjects(limit = 3) {
  return fetchRecords('projects', {
    filters: [{ column: 'is_featured', value: true }],
    order: { column: 'position', ascending: true },
    limit
  });
}

export async function fetchAllProjects() {
  return fetchRecords('projects', {
    order: { column: 'position', ascending: true }
  });
}

export async function fetchLatestBlogPosts(limit = 3) {
  return fetchRecords('blog_posts', {
    order: { column: 'published_at', ascending: false },
    limit
  });
}

export async function fetchAllBlogPosts() {
  return fetchRecords('blog_posts', {
    order: { column: 'published_at', ascending: false }
  });
}

export async function fetchTestimonials(limit = 5) {
  return fetchRecords('testimonials', {
    order: { column: 'position', ascending: true },
    limit
  });
}

export async function fetchContactChannels() {
  return fetchRecords('contact_channels', {
    order: { column: 'position', ascending: true }
  });
}
