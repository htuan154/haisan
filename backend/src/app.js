const express = require('express');
const { registerResourceRoutes } = require('./routes/resourceRoutes');
const { createAuthRouter } = require('./routes/authRoutes');
const { setupSwagger } = require('./swagger');

function createApp() {
  const app = express();

  app.use(express.json());

  // Setup Swagger documentation
  setupSwagger(app);

  app.get('/health', (_req, res) => {
    return res.status(200).json({ ok: true, service: 'haisan-backend' });
  });

  const apiRouter = express.Router();
  apiRouter.use('/auth', createAuthRouter());
  registerResourceRoutes(apiRouter);
  app.use('/api', apiRouter);

  app.use((err, _req, res, _next) => {
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  });

  return app;
}

module.exports = {
  createApp,
};
