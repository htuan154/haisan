const express = require('express');
const authController = require('../controllers/authController');

function createAuthRouter() {
  const router = express.Router();

  router.post('/register', authController.register);
  router.post('/login', authController.login);

  return router;
}

module.exports = {
  createAuthRouter,
};
