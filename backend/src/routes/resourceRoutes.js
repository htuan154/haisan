const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

/**
 * @swagger
 * /api/{resource}:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get all resources
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: accounts
 *     responses:
 *       200:
 *         description: List of resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *   post:
 *     tags:
 *       - Resources
 *     summary: Create a new resource
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: accounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid request
 * /api/{resource}/{id}:
 *   get:
 *     tags:
 *       - Resources
 *     summary: Get resource by ID
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: accounts
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *   patch:
 *     tags:
 *       - Resources
 *     summary: Update a resource
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: accounts
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
 *         description: Resource updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: Resource not found
 *   delete:
 *     tags:
 *       - Resources
 *     summary: Delete a resource
 *     parameters:
 *       - name: resource
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: accounts
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 */

function registerResourceRoutes(router) {
  Object.entries(RESOURCES).forEach(([resourceName, config]) => {
    const service = createResourceService(config);
    const controller = createResourceController(config, service);
    const basePath = config.path || `/${resourceName}`;

    router.get(basePath, controller.list);
    router.get(`${basePath}/:id`, controller.getById);
    router.post(basePath, controller.create);
    router.patch(`${basePath}/:id`, controller.update);
    router.delete(`${basePath}/:id`, controller.remove);
  });

  return router;
}

module.exports = {
  registerResourceRoutes,
};
