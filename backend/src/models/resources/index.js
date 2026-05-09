const { accounts } = require('./accounts');
const { catalog } = require('./catalog');
const { inventory } = require('./inventory');
const { sales } = require('./sales');
const { customerService } = require('./customerService');
const { validateRequiredFields, validateEnumFields } = require('./validation');

const RESOURCES = Object.freeze({
  ...accounts,
  ...catalog,
  ...inventory,
  ...sales,
  ...customerService,
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
