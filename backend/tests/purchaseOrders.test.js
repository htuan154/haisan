const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Purchase Orders - getResourceConfig returns config for purchaseOrders', () => {
  const config = getResourceConfig('purchaseOrders');
  assert.ok(config);
  assert.equal(config.table, 'purchase_orders');
  assert.equal(config.path, '/purchase-orders');
});

test('Purchase Orders - validateRequiredFields detects missing total_amount', () => {
  const validation = validateRequiredFields(
    {},
    ['total_amount'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['total_amount']);
});

test('Purchase Orders - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    { total_amount: 5000 },
    ['total_amount'],
  );

  assert.equal(validation.ok, true);
});
