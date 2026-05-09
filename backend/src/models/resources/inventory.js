const { PURCHASE_PAYMENT_STATUS } = require('../enums');

const inventory = {
  purchaseOrders: {
    table: 'purchase_orders',
    path: '/purchase-orders',
    requiredFields: ['total_amount'],
    enumFields: { payment_status: PURCHASE_PAYMENT_STATUS },
  },
  importBatches: {
    table: 'import_batches',
    path: '/import-batches',
    requiredFields: ['purchase_order_id', 'product_id', 'import_quantity', 'stock_quantity', 'actual_import_price'],
  },
};

module.exports = {
  inventory,
};
