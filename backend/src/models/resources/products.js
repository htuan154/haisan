const { PRODUCT_STATUS } = require('../enums');

const products = {
  table: 'products',
  path: '/products',
  requiredFields: ['product_name', 'retail_price', 'wholesale_price'],
  enumFields: { product_status: PRODUCT_STATUS },
};

module.exports = {
  products,
};
