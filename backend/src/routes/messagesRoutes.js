const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/messages:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get all messages
 *     responses:
 *       200:
 *         description: List of messages
 *   post:
 *     tags:
 *       - Messages
 *     summary: Create a new message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Message created successfully
 * /api/messages/{id}:
 *   get:
 *     tags:
 *       - Messages
 *     summary: Get message by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message found
 *       404:
 *         description: Message not found
 *   patch:
 *     tags:
 *       - Messages
 *     summary: Update a message
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
 *         description: Message updated successfully
 *       404:
 *         description: Message not found
 *   delete:
 *     tags:
 *       - Messages
 *     summary: Delete a message
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       404:
 *         description: Message not found
 */

function createMessagesRouter() {
  const router = express.Router();
  const config = RESOURCES.messages;
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
  createMessagesRouter,
};
