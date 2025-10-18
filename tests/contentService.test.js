import assert from 'node:assert/strict';
import test from 'node:test';

function createQueryResponse(data, error = null) {
  const response = { data, error };
  const calls = {
    eq: [],
    order: [],
    limit: [],
    single: 0
  };

  const promise = Promise.resolve(response);

  promise.eq = (column, value) => {
    calls.eq.push({ column, value });
    return promise;
  };

  promise.order = (column, options) => {
    calls.order.push({ column, options });
    return promise;
  };

  promise.limit = (value) => {
    calls.limit.push(value);
    return promise;
  };

  promise.single = () => {
    calls.single += 1;
    return Promise.resolve(response);
  };

  promise.calls = calls;
  return promise;
}

function createClient(query) {
  const calls = {
    from: [],
    select: []
  };

  return {
    calls,
    from(table) {
      calls.from.push(table);
      return {
        select(selection) {
          calls.select.push(selection);
          return query;
        }
      };
    }
  };
}

test('fetchRecords caches results for identical lookups', async (t) => {
  const module = await import('../src/services/contentService.js');
  const query = createQueryResponse([{ id: 1 }]);
  const client = createClient(query);
  module.__setSupabaseClient(client);
  t.after(() => module.__resetSupabaseClient());

  const first = await module.fetchRecords('projects');
  const second = await module.fetchRecords('projects');

  assert.deepEqual(first, [{ id: 1 }]);
  assert.deepEqual(second, first);
  assert.equal(client.calls.from.length, 1);
});

test('fetchFeaturedProjects applies filters, ordering, and limit', async (t) => {
  const module = await import('../src/services/contentService.js');
  const query = createQueryResponse([{ id: 1 }]);
  const client = createClient(query);
  module.__setSupabaseClient(client);
  t.after(() => module.__resetSupabaseClient());

  await module.fetchFeaturedProjects(5);

  assert.deepEqual(client.calls.from, ['projects']);
  assert.equal(query.calls.eq.length, 1);
  assert.deepEqual(query.calls.eq[0], { column: 'is_featured', value: true });
  assert.equal(query.calls.order.length, 1);
  assert.deepEqual(query.calls.order[0], {
    column: 'position',
    options: { ascending: true, nullsFirst: false }
  });
  assert.equal(query.calls.limit.length, 1);
  assert.equal(query.calls.limit[0], 5);
});

test('fetchSiteSettings uses single-row selection', async (t) => {
  const module = await import('../src/services/contentService.js');
  const data = { id: 1, site_title: 'Test' };
  const query = createQueryResponse(data);
  query.single = () => {
    query.calls.single += 1;
    return Promise.resolve({ data, error: null });
  };
  const client = createClient(query);
  module.__setSupabaseClient(client);
  t.after(() => module.__resetSupabaseClient());

  const result = await module.fetchSiteSettings();

  assert.deepEqual(result, data);
  assert.equal(query.calls.single, 1);
});

test('fetchRecords throws when Supabase returns an error', async (t) => {
  const module = await import('../src/services/contentService.js');
  const error = { message: 'failure' };
  const query = createQueryResponse(null, error);
  const client = createClient(query);
  module.__setSupabaseClient(client);
  t.after(() => module.__resetSupabaseClient());

  const consoleErrors = [];
  const originalError = console.error;
  console.error = (...args) => consoleErrors.push(args);
  t.after(() => {
    console.error = originalError;
  });

  await assert.rejects(() => module.fetchRecords('projects'), error);
  assert.equal(consoleErrors.length > 0, true);
});
