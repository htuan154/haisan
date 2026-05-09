const { ORDER_TYPE, ORDER_STATUS, DISCOUNT_TYPE } = require('../enums');

const sales = {
  coupons: {
    table: 'coupons',
    path: '/coupons',
    requiredFields: ['code', 'discount_value', 'expiration_date'],
    enumFields: { discount_type: DISCOUNT_TYPE },
  },
  orders: {
    table: 'orders',
    path: '/orders',
    requiredFields: ['customer_id', 'subtotal', 'total_amount', 'delivery_address'],
    enumFields: { order_type: ORDER_TYPE, status: ORDER_STATUS },
  },
  orderDetails: {
    table: 'order_details',
    path: '/order-details',
    requiredFields: ['order_id', 'product_id', 'dispatched_weight', 'applied_price', 'total_price'],
  },
};

module.exports = {
  sales,
};
