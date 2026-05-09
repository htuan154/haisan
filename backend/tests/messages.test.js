const test = require('node:test');
const assert = require('node:assert/strict');

const {
  getResourceConfig,
  validateRequiredFields,
} = require('../src/models/resources/index');

test('Messages - getResourceConfig returns config for messages', () => {
  const config = getResourceConfig('messages');
  assert.ok(config);
  assert.equal(config.table, 'messages');
  assert.equal(config.path, '/messages');
});

test('Messages - validateRequiredFields detects missing fields', () => {
  const validation = validateRequiredFields(
    { chat_room_id: '123' },
    ['chat_room_id', 'sender_id'],
  );

  assert.equal(validation.ok, false);
  assert.deepEqual(validation.missingFields, ['sender_id']);
});

test('Messages - validateRequiredFields passes with all required fields', () => {
  const validation = validateRequiredFields(
    {
      chat_room_id: '123',
      sender_id: '456',
    },
    ['chat_room_id', 'sender_id'],
  );

  assert.equal(validation.ok, true);
});
