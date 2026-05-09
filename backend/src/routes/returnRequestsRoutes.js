const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/return-requests:
 *   get:
 *     tags:
 *       - Return Requests
 *     summary: Get all return requests
 *     responses:
 *       200:
 *         description: List of return requests
 *   post:
 *     tags:
 *       - Return Requests
 *     summary: Create a new return request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Return request created successfully
 * /api/return-requests/{id}:
 *   get:
 *     tags:
 *       - Return Requests
 *     summary: Get return request by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return request found
 *       404:
 *         description: Return request not found
 *   patch:
 *     tags:
 *       - Return Requests
 *     summary: Update a return request
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
 *         description: Return request updated successfully
 *       404:
 *         description: Return request not found
 *   delete:
 *     tags:
 *       - Return Requests
 *     summary: Delete a return request
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Return request deleted successfully
 *       404:
 *         description: Return request not found
 */

function createReturnRequestsRouter() {
  const router = express.Router();
  const config = RESOURCES.returnRequests;
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
  createReturnRequestsRouter,
};
