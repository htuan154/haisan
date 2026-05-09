const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Products - getResourceConfig returns config for products', () => {
  const config = getResourceConfig('products');
  assert.ok(config);
  assert.equal(config.table, 'products');
  assert.equal(config.path, '/products');
});

test('Products - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { product_name: 'Laptop' },
    ['product_name', 'retail_price', 'wholesale_price'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['retail_price', 'wholesale_price']);
});

test('Products - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      product_name: 'Laptop',
      retail_price: 1000,
      wholesale_price: 800,
    },
    ['product_name', 'retail_price', 'wholesale_price'],
  );

  assert.equal(validation.ok, true);
});
