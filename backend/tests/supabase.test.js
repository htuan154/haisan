const test = require('node:test');
const assert = require('node:assert/strict');

const { createSupabaseClient } = require('../src/utils/supabase');

test('createSupabaseClient throws when env is missing', () => {
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const previousKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  assert.throws(() => createSupabaseClient(), /Missing Supabase environment variables/);

  if (previousUrl !== undefined) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
  }

  if (previousKey !== undefined) {
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = previousKey;
  }
});

test('createSupabaseClient returns a client when env is present', () => {
  const previousUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const previousKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_example';

  const client = createSupabaseClient();

  assert.ok(client);

  if (previousUrl !== undefined) {
    process.env.NEXT_PUBLIC_SUPABASE_URL = previousUrl;
  } else {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  }

  if (previousKey !== undefined) {
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = previousKey;
  } else {
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  }
});