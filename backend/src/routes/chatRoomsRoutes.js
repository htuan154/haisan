const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/chat-rooms:
 *   get:
 *     tags:
 *       - Chat Rooms
 *     summary: Get all chat rooms
 *     responses:
 *       200:
 *         description: List of chat rooms
 *   post:
 *     tags:
 *       - Chat Rooms
 *     summary: Create a new chat room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Chat room created successfully
 * /api/chat-rooms/{id}:
 *   get:
 *     tags:
 *       - Chat Rooms
 *     summary: Get chat room by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat room found
 *       404:
 *         description: Chat room not found
 *   patch:
 *     tags:
 *       - Chat Rooms
 *     summary: Update a chat room
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
 *         description: Chat room updated successfully
 *       404:
 *         description: Chat room not found
 *   delete:
 *     tags:
 *       - Chat Rooms
 *     summary: Delete a chat room
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat room deleted successfully
 *       404:
 *         description: Chat room not found
 */

function createChatRoomsRouter() {
  const router = express.Router();
  const config = RESOURCES.chatRooms;
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
  createChatRoomsRouter,
};
