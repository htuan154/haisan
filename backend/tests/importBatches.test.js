const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Import Batches - getResourceConfig returns config for importBatches', () => {
  const config = getResourceConfig('importBatches');
  assert.ok(config);
  assert.equal(config.table, 'import_batches');
  assert.equal(config.path, '/import-batches');
});

test('Import Batches - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { purchase_order_id: '123' },
    ['purchase_order_id', 'product_id', 'import_quantity', 'stock_quantity', 'actual_import_price'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['product_id', 'import_quantity', 'stock_quantity', 'actual_import_price']);
});

test('Import Batches - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      purchase_order_id: '123',
      product_id: '456',
      import_quantity: 100,
      stock_quantity: 100,
      actual_import_price: 50,
    },
    ['purchase_order_id', 'product_id', 'import_quantity', 'stock_quantity', 'actual_import_price'],
  );

  assert.equal(validation.ok, true);
});
