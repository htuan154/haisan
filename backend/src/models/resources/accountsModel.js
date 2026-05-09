const { ROLE } = require('../enums');

const accountsModel = {
  table: 'accounts',
  path: '/accounts',
  requiredFields: ['full_name'],
  enumFields: { role: ROLE },
};

module.exports = {
  accountsModel,
};
