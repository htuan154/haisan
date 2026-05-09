const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Orders - getResourceConfig returns config for orders', () => {
  const config = getResourceConfig('orders');
  assert.ok(config);
  assert.equal(config.table, 'orders');
  assert.equal(config.path, '/orders');
});

test('Orders - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { customer_id: '123' },
    ['customer_id', 'subtotal', 'total_amount', 'delivery_address'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['subtotal', 'total_amount', 'delivery_address']);
});

test('Orders - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      customer_id: '123',
      subtotal: 100,
      total_amount: 110,
      delivery_address: '123 Main St',
    },
    ['customer_id', 'subtotal', 'total_amount', 'delivery_address'],
  );

  assert.equal(validation.ok, true);
});
