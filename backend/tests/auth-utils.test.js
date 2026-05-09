const test = require('node:test');
const assert = require('node:assert/strict');

const { hashPassword, verifyPassword, sanitizeAccount } = require('../src/utils/auth');

test('hashPassword + verifyPassword work correctly', async () => {
  const password = 'secret123';
  const hash = await hashPassword(password);

  assert.notEqual(hash, password);

  const valid = await verifyPassword(password, hash);
  const invalid = await verifyPassword('wrong-password', hash);

  assert.equal(valid, true);
  assert.equal(invalid, false);
});

test('sanitizeAccount removes password_hash', () => {
  const account = {
    id: 'a',
    full_name: 'A',
    password_hash: 'hash',
  };

  const sanitized = sanitizeAccount(account);
  assert.equal(sanitized.password_hash, undefined);
  assert.equal(sanitized.id, 'a');
});
