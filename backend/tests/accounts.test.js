const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Accounts - getResourceConfig returns config for accounts', () => {
  const config = getResourceConfig('accounts');
  assert.ok(config);
  assert.equal(config.table, 'accounts');
  assert.equal(config.path, '/accounts');
});

test('Accounts - validateRequiredFields detects missing full_name', () => {
  const validation = validateRequiredFields(
    {},
    ['full_name'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['full_name']);
});

test('Accounts - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    { full_name: 'John Doe' },
    ['full_name'],
  );

  assert.equal(validation.ok, true);
});
