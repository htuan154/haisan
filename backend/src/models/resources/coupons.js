const { DISCOUNT_TYPE } = require('../enums');

const coupons = {
  table: 'coupons',
  path: '/coupons',
  requiredFields: ['code', 'discount_value', 'expiration_date'],
  enumFields: { discount_type: DISCOUNT_TYPE },
};

module.exports = {
  coupons,
};
