const express = require('express');
const { createAuthRouter } = require('./routes/authRoutes');
const { createAccountsRouter } = require('./routes/accountsRoutes');
const { createCategoriesRouter } = require('./routes/categoriesRoutes');
const { createProductsRouter } = require('./routes/productsRoutes');
const { createChatRoomsRouter } = require('./routes/chatRoomsRoutes');
const { createMessagesRouter } = require('./routes/messagesRoutes');
const { createReturnRequestsRouter } = require('./routes/returnRequestsRoutes');
const { createPurchaseOrdersRouter } = require('./routes/purchaseOrdersRoutes');
const { createImportBatchesRouter } = require('./routes/importBatchesRoutes');
const { createCouponsRouter } = require('./routes/couponsRoutes');
const { createOrdersRouter } = require('./routes/ordersRoutes');
const { createOrderDetailsRouter } = require('./routes/orderDetailsRoutes');
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
  
  // Auth routes
  apiRouter.use('/auth', createAuthRouter());
  
  // Each resource has its own route file
  apiRouter.use('/accounts', createAccountsRouter());
  apiRouter.use('/categories', createCategoriesRouter());
  apiRouter.use('/products', createProductsRouter());
  apiRouter.use('/chat-rooms', createChatRoomsRouter());
  apiRouter.use('/messages', createMessagesRouter());
  apiRouter.use('/return-requests', createReturnRequestsRouter());
  apiRouter.use('/purchase-orders', createPurchaseOrdersRouter());
  apiRouter.use('/import-batches', createImportBatchesRouter());
  apiRouter.use('/coupons', createCouponsRouter());
  apiRouter.use('/orders', createOrdersRouter());
  apiRouter.use('/order-details', createOrderDetailsRouter());
  
  app.use('/api', apiRouter);

  app.use((err, _req, res, _next) => {
    return res.status(500).json({ error: err.message || 'Internal server error.' });
  });

  return app;
}

module.exports = {
  createApp,
};
