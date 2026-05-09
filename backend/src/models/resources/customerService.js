const { REFUND_SOLUTION, RETURN_STATUS } = require('../enums');

const customerService = {
  chatRooms: {
    table: 'chat_rooms',
    path: '/chat-rooms',
    requiredFields: ['account_id'],
  },
  messages: {
    table: 'messages',
    path: '/messages',
    requiredFields: ['chat_room_id', 'sender_id'],
  },
  returnRequests: {
    table: 'return_requests',
    path: '/return-requests',
    requiredFields: ['order_id', 'order_detail_id', 'reason'],
    enumFields: { solution: REFUND_SOLUTION, status: RETURN_STATUS },
  },
};

module.exports = {
  customerService,
};
