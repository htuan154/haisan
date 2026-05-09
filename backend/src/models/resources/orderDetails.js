const orderDetails = {
  table: 'order_details',
  path: '/order-details',
  requiredFields: ['order_id', 'product_id', 'dispatched_weight', 'applied_price', 'total_price'],
};

module.exports = {
  orderDetails,
};
