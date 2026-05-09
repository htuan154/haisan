const { accountsModel } = require('./accountsModel');
const { categories } = require('./categories');
const { products } = require('./products');
const { chatRooms } = require('./chatRooms');
const { messages } = require('./messages');
const { returnRequests } = require('./returnRequests');
const { purchaseOrders } = require('./purchaseOrders');
const { importBatches } = require('./importBatches');
const { coupons } = require('./coupons');
const { orders } = require('./orders');
const { orderDetails } = require('./orderDetails');
const { validateRequiredFields, validateEnumFields } = require('./validation');

const RESOURCES = Object.freeze({
  accounts: accountsModel,
  categories,
  products,
  chatRooms,
  messages,
  returnRequests,
  purchaseOrders,
  importBatches,
  coupons,
  orders,
  orderDetails,
});

function getResourceConfig(resourceName) {
  return RESOURCES[resourceName] || null;
}

module.exports = {
  RESOURCES,
  getResourceConfig,
  validateRequiredFields,
  validateEnumFields,
};
