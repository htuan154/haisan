const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
  validateEnumFields,
} = require('../src/models/resources/index');

test('getResourceConfig returns config for known resource', () => {
  const config = getResourceConfig('accounts');
  assert.ok(config);
  assert.equal(config.table, 'accounts');
});

test('validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    {},
    ['full_name'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['full_name']);
});

test('validateEnumFields detects invalid enum values', () => {
  const validation = validateEnumFields(
    {
      role: 'Owner',
    },
    {
      role: ['Admin', 'Manager', 'Staff', 'Shipper', 'Customer', 'Supplier'],
    },
  );

  assert.equal(validation.ok, false);
  assert.equal(validation.invalidFields[0].field, 'role');
  assert.equal(validation.invalidFields[0].value, 'Owner');
});
