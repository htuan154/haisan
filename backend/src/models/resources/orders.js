const { ORDER_TYPE, ORDER_STATUS } = require('../enums');

const orders = {
  table: 'orders',
  path: '/orders',
  requiredFields: ['customer_id', 'subtotal', 'total_amount', 'delivery_address'],
  enumFields: { order_type: ORDER_TYPE, status: ORDER_STATUS },
};

module.exports = {
  orders,
};
