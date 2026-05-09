const { PRODUCT_STATUS } = require('../enums');

const categories = {
  table: 'categories',
  path: '/categories',
  requiredFields: ['category_name'],
};

module.exports = {
  categories,
};
