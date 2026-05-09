const importBatches = {
  table: 'import_batches',
  path: '/import-batches',
  requiredFields: ['purchase_order_id', 'product_id', 'import_quantity', 'stock_quantity', 'actual_import_price'],
};

module.exports = {
  importBatches,
};
