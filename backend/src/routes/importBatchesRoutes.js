const express = require('express');
const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/import-batches:
 *   get:
 *     tags:
 *       - Import Batches
 *     summary: Get all import batches
 *     responses:
 *       200:
 *         description: List of import batches
 *   post:
 *     tags:
 *       - Import Batches
 *     summary: Create a new import batch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Import batch created successfully
 * /api/import-batches/{id}:
 *   get:
 *     tags:
 *       - Import Batches
 *     summary: Get import batch by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Import batch found
 *       404:
 *         description: Import batch not found
 *   patch:
 *     tags:
 *       - Import Batches
 *     summary: Update an import batch
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
 *         description: Import batch updated successfully
 *       404:
 *         description: Import batch not found
 *   delete:
 *     tags:
 *       - Import Batches
 *     summary: Delete an import batch
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Import batch deleted successfully
 *       404:
 *         description: Import batch not found
 */

function createImportBatchesRouter() {
  const router = express.Router();
  const config = RESOURCES.importBatches;
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
  createImportBatchesRouter,
};
