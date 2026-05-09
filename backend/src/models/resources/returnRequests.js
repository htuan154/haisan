const { REFUND_SOLUTION, RETURN_STATUS } = require('../enums');

const returnRequests = {
  table: 'return_requests',
  path: '/return-requests',
  requiredFields: ['order_id', 'order_detail_id', 'reason'],
  enumFields: { solution: REFUND_SOLUTION, status: RETURN_STATUS },
};

module.exports = {
  returnRequests,
};
