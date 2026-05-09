const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/purchase-orders:
 *   get:
 *     tags:
 *       - Purchase Orders
 *     summary: Get all purchase orders
 *     responses:
 *       200:
 *         description: List of purchase orders
 *   post:
 *     tags:
 *       - Purchase Orders
 *     summary: Create a new purchase order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Purchase order created successfully
 * /api/purchase-orders/{id}:
 *   get:
 *     tags:
 *       - Purchase Orders
 *     summary: Get purchase order by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order found
 *       404:
 *         description: Purchase order not found
 *   patch:
 *     tags:
 *       - Purchase Orders
 *     summary: Update a purchase order
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
 *         description: Purchase order updated successfully
 *       404:
 *         description: Purchase order not found
 *   delete:
 *     tags:
 *       - Purchase Orders
 *     summary: Delete a purchase order
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Purchase order deleted successfully
 *       404:
 *         description: Purchase order not found
 */

function createPurchaseOrdersRouter() {
  const router = express.Router();
  const config = RESOURCES.purchaseOrders;
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
  createPurchaseOrdersRouter,
};
