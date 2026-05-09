const PRODUCT_STATUS = Object.freeze(['Fresh_Alive', 'Frozen', 'Dried']);
const ROLE = Object.freeze(['Admin', 'Manager', 'Staff', 'Shipper', 'Customer', 'Supplier']);
const PURCHASE_PAYMENT_STATUS = Object.freeze(['Unpaid', 'Partial_Paid', 'Paid']);
const ORDER_TYPE = Object.freeze(['Wholesale', 'Retail']);
const ORDER_STATUS = Object.freeze(['Pending', 'Delivering', 'Completed', 'Cancelled']);
const REFUND_SOLUTION = Object.freeze(['Refund', 'Reship', 'Discount_Debt_Deduction']);
const RETURN_STATUS = Object.freeze(['Pending', 'Processing', 'Completed']);
const DISCOUNT_TYPE = Object.freeze(['Percentage', 'Fixed_Amount']);

module.exports = {
  PRODUCT_STATUS,
  ROLE,
  PURCHASE_PAYMENT_STATUS,
  ORDER_TYPE,
  ORDER_STATUS,
  REFUND_SOLUTION,
  RETURN_STATUS,
  DISCOUNT_TYPE,
};
