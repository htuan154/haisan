const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Return Requests - getResourceConfig returns config for returnRequests', () => {
  const config = getResourceConfig('returnRequests');
  assert.ok(config);
  assert.equal(config.table, 'return_requests');
  assert.equal(config.path, '/return-requests');
});

test('Return Requests - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { order_id: '123' },
    ['order_id', 'order_detail_id', 'reason'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['order_detail_id', 'reason']);
});

test('Return Requests - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      order_id: '123',
      order_detail_id: '456',
      reason: 'Defective product',
    },
    ['order_id', 'order_detail_id', 'reason'],
  );

  assert.equal(validation.ok, true);
});
