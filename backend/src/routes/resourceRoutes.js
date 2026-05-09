const { RESOURCES } = require('../models/resources/index');
const { createResourceService } = require('../services/resourceService');
const { createResourceController } = require('../controllers/resourceController');

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
