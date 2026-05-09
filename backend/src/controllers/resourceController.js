const {
  validateRequiredFields,
  validateEnumFields,
} = require('../models/resources/index');

function parsePagination(query) {
  const page = Number.parseInt(query.page, 10) || 1;
  const pageSize = Number.parseInt(query.pageSize, 10) || 20;
  const orderBy = query.orderBy || 'created_at';
  const orderDirection = query.orderDirection === 'asc' ? 'asc' : 'desc';

  return {
    page: Math.max(page, 1),
    pageSize: Math.min(Math.max(pageSize, 1), 100),
    orderBy,
    orderDirection,
  };
}

function createResourceController(config, service) {
  async function list(req, res) {
    try {
      const result = await service.list(parsePagination(req.query));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async function getById(req, res) {
    try {
      const item = await service.getById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async function create(req, res) {
    try {
      const requiredValidation = validateRequiredFields(req.body, config.requiredFields);
      if (!requiredValidation.ok) {
        return res.status(400).json({
          error: 'Missing required fields.',
          details: requiredValidation.missingFields,
        });
      }

      const enumValidation = validateEnumFields(req.body, config.enumFields);
      if (!enumValidation.ok) {
        return res.status(400).json({
          error: 'Enum validation failed.',
          details: enumValidation.invalidFields,
        });
      }

      const created = await service.create(req.body);
      return res.status(201).json(created);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async function update(req, res) {
    try {
      const enumValidation = validateEnumFields(req.body, config.enumFields);
      if (!enumValidation.ok) {
        return res.status(400).json({
          error: 'Enum validation failed.',
          details: enumValidation.invalidFields,
        });
      }

      const updated = await service.update(req.params.id, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async function remove(req, res) {
    try {
      const result = await service.remove(req.params.id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  return {
    list,
    getById,
    create,
    update,
    remove,
  };
}

module.exports = {
  createResourceController,
};
