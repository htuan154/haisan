const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Order created successfully
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get order by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *   patch:
 *     tags:
 *       - Orders
 *     summary: Update an order
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
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 *   delete:
 *     tags:
 *       - Orders
 *     summary: Delete an order
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

function createOrdersRouter() {
  const router = express.Router();
  const config = RESOURCES.orders;
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
  createOrdersRouter,
};
