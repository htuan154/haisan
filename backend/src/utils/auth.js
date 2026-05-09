const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash || '');
}

function signAccessToken(account) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('Missing JWT_SECRET environment variable.');
  }

  return jwt.sign(
    {
      sub: account.id,
      role: account.role,
      full_name: account.full_name,
      phone_number: account.phone_number,
      email: account.email,
    },
    jwtSecret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },
  );
}

function sanitizeAccount(account) {
  if (!account) {
    return null;
  }

  const { password_hash: _passwordHash, ...safeAccount } = account;
  return safeAccount;
}

module.exports = {
  hashPassword,
  verifyPassword,
  signAccessToken,
  sanitizeAccount,
};
