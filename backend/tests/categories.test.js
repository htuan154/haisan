const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Categories - getResourceConfig returns config for categories', () => {
  const config = getResourceConfig('categories');
  assert.ok(config);
  assert.equal(config.table, 'categories');
  assert.equal(config.path, '/categories');
});

test('Categories - validateRequiredFields detects missing category_name', () => {
  const validation = validateRequiredFields(
    {},
    ['category_name'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['category_name']);
});

test('Categories - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    { category_name: 'Electronics' },
    ['category_name'],
  );

  assert.equal(validation.ok, true);
});
