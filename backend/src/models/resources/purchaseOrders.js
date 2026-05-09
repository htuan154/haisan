const { PURCHASE_PAYMENT_STATUS } = require('../enums');

const purchaseOrders = {
  table: 'purchase_orders',
  path: '/purchase-orders',
  requiredFields: ['total_amount'],
  enumFields: { payment_status: PURCHASE_PAYMENT_STATUS },
};

module.exports = {
  purchaseOrders,
};
