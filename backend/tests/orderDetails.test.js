const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Order Details - getResourceConfig returns config for orderDetails', () => {
  const config = getResourceConfig('orderDetails');
  assert.ok(config);
  assert.equal(config.table, 'order_details');
  assert.equal(config.path, '/order-details');
});

test('Order Details - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { order_id: '123' },
    ['order_id', 'product_id', 'dispatched_weight', 'applied_price', 'total_price'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['product_id', 'dispatched_weight', 'applied_price', 'total_price']);
});

test('Order Details - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      order_id: '123',
      product_id: '456',
      dispatched_weight: 10,
      applied_price: 50,
      total_price: 500,
    },
    ['order_id', 'product_id', 'dispatched_weight', 'applied_price', 'total_price'],
  );

  assert.equal(validation.ok, true);
});
