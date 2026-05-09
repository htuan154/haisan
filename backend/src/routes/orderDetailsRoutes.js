const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/order-details:
 *   get:
 *     tags:
 *       - Order Details
 *     summary: Get all order details
 *     responses:
 *       200:
 *         description: List of order details
 *   post:
 *     tags:
 *       - Order Details
 *     summary: Create new order details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Order details created successfully
 * /api/order-details/{id}:
 *   get:
 *     tags:
 *       - Order Details
 *     summary: Get order details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details found
 *       404:
 *         description: Order details not found
 *   patch:
 *     tags:
 *       - Order Details
 *     summary: Update order details
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
 *         description: Order details updated successfully
 *       404:
 *         description: Order details not found
 *   delete:
 *     tags:
 *       - Order Details
 *     summary: Delete order details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details deleted successfully
 *       404:
 *         description: Order details not found
 */

function createOrderDetailsRouter() {
  const router = express.Router();
  const config = RESOURCES.orderDetails;
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
  createOrderDetailsRouter,
};
