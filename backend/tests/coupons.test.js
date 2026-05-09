const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Coupons - getResourceConfig returns config for coupons', () => {
  const config = getResourceConfig('coupons');
  assert.ok(config);
  assert.equal(config.table, 'coupons');
  assert.equal(config.path, '/coupons');
});

test('Coupons - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { code: 'SAVE10' },
    ['code', 'discount_value', 'expiration_date'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['discount_value', 'expiration_date']);
});

test('Coupons - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      code: 'SAVE10',
      discount_value: 10,
      expiration_date: '2024-12-31',
    },
    ['code', 'discount_value', 'expiration_date'],
  );

  assert.equal(validation.ok, true);
});
