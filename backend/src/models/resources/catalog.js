const { PRODUCT_STATUS } = require('../enums');

const catalog = {
  categories: {
    table: 'categories',
    path: '/categories',
    requiredFields: ['category_name'],
  },
  products: {
    table: 'products',
    path: '/products',
    requiredFields: ['product_name', 'retail_price', 'wholesale_price'],
    enumFields: { product_status: PRODUCT_STATUS },
  },
};

module.exports = {
  catalog,
};
