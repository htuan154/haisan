const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Get all accounts
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 * /api/accounts/{id}:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Get account by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Account not found
 *   patch:
 *     tags:
 *       - Accounts
 *     summary: Update an account
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Account not found
 *   delete:
 *     tags:
 *       - Accounts
 *     summary: Delete an account
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 */

function createAccountsRouter() {
  const router = express.Router();
  const config = RESOURCES.accounts;
  const service = createResourceService(config);
  const controller = createResourceController(config, service);

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.patch('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
}

module.exports = {
  createAccountsRouter,
};
