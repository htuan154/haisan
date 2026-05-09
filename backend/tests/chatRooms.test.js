const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Chat Rooms - getResourceConfig returns config for chatRooms', () => {
  const config = getResourceConfig('chatRooms');
  assert.ok(config);
  assert.equal(config.table, 'chat_rooms');
  assert.equal(config.path, '/chat-rooms');
});

test('Chat Rooms - validateRequiredFields detects missing account_id', () => {
  const validation = validateRequiredFields(
    {},
    ['account_id'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['account_id']);
});

test('Chat Rooms - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    { account_id: '123' },
    ['account_id'],
  );

  assert.equal(validation.ok, true);
});
