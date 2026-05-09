const { ROLE } = require('../enums');

const accounts = {
  accounts: {
    table: 'accounts',
    path: '/accounts',
    requiredFields: ['full_name'],
    enumFields: { role: ROLE },
  },
};

module.exports = {
  accounts,
};
