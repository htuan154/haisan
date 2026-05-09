const swaggerUi = require('swagger-ui-express');

const specs = {
  openapi: '3.0.0',
  info: {
    title: 'Haisan Backend API',
    version: '1.0.0',
    description: 'API documentation for Haisan backend service with authentication and resource management',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'http://localhost:5000',
      description: 'Development server (alternative)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
        required: ['email', 'password'],
      },
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      Resource: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
    security: [],
  },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Invalid input' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string' },
                },
                required: ['email', 'password'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/api/accounts': {
      get: {
        tags: ['Accounts'],
        summary: 'Get all accounts',
        responses: {
          200: { description: 'List of accounts' },
        },
      },
      post: {
        tags: ['Accounts'],
        summary: 'Create a new account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Resource' },
            },
          },
        },
        responses: {
          201: { description: 'Account created' },
          400: { description: 'Invalid input' },
        },
      },
    },
    '/api/accounts/{id}': {
      get: {
        tags: ['Accounts'],
        summary: 'Get account by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Account found' },
          404: { description: 'Account not found' },
        },
      },
      patch: {
        tags: ['Accounts'],
        summary: 'Update an account',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Resource' },
            },
          },
        },
        responses: {
          200: { description: 'Account updated' },
          404: { description: 'Account not found' },
        },
      },
      delete: {
        tags: ['Accounts'],
        summary: 'Delete an account',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Account deleted' },
          404: { description: 'Account not found' },
        },
      },
    },
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all categories',
        responses: { 200: { description: 'List of categories' } },
      },
      post: {
        tags: ['Categories'],
        summary: 'Create a new category',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Category created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        summary: 'Get category by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Category found' }, 404: { description: 'Category not found' } },
      },
      patch: {
        tags: ['Categories'],
        summary: 'Update a category',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Category updated' }, 404: { description: 'Category not found' } },
      },
      delete: {
        tags: ['Categories'],
        summary: 'Delete a category',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Category deleted' }, 404: { description: 'Category not found' } },
      },
    },
    '/api/products': {
      get: { tags: ['Products'], summary: 'Get all products', responses: { 200: { description: 'List of products' } } },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Product created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Product found' }, 404: { description: 'Product not found' } },
      },
      patch: {
        tags: ['Products'],
        summary: 'Update a product',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Product updated' }, 404: { description: 'Product not found' } },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete a product',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Product deleted' }, 404: { description: 'Product not found' } },
      },
    },
    '/api/chat-rooms': {
      get: { tags: ['Chat Rooms'], summary: 'Get all chat rooms', responses: { 200: { description: 'List of chat rooms' } } },
      post: {
        tags: ['Chat Rooms'],
        summary: 'Create a new chat room',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Chat room created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/chat-rooms/{id}': {
      get: {
        tags: ['Chat Rooms'],
        summary: 'Get chat room by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Chat room found' }, 404: { description: 'Chat room not found' } },
      },
      patch: {
        tags: ['Chat Rooms'],
        summary: 'Update a chat room',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Chat room updated' }, 404: { description: 'Chat room not found' } },
      },
      delete: {
        tags: ['Chat Rooms'],
        summary: 'Delete a chat room',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Chat room deleted' }, 404: { description: 'Chat room not found' } },
      },
    },
    '/api/messages': {
      get: { tags: ['Messages'], summary: 'Get all messages', responses: { 200: { description: 'List of messages' } } },
      post: {
        tags: ['Messages'],
        summary: 'Create a new message',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Message created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/messages/{id}': {
      get: {
        tags: ['Messages'],
        summary: 'Get message by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Message found' }, 404: { description: 'Message not found' } },
      },
      patch: {
        tags: ['Messages'],
        summary: 'Update a message',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Message updated' }, 404: { description: 'Message not found' } },
      },
      delete: {
        tags: ['Messages'],
        summary: 'Delete a message',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Message deleted' }, 404: { description: 'Message not found' } },
      },
    },
    '/api/return-requests': {
      get: { tags: ['Return Requests'], summary: 'Get all return requests', responses: { 200: { description: 'List of return requests' } } },
      post: {
        tags: ['Return Requests'],
        summary: 'Create a new return request',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Return request created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/return-requests/{id}': {
      get: {
        tags: ['Return Requests'],
        summary: 'Get return request by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Return request found' }, 404: { description: 'Return request not found' } },
      },
      patch: {
        tags: ['Return Requests'],
        summary: 'Update a return request',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Return request updated' }, 404: { description: 'Return request not found' } },
      },
      delete: {
        tags: ['Return Requests'],
        summary: 'Delete a return request',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Return request deleted' }, 404: { description: 'Return request not found' } },
      },
    },
    '/api/purchase-orders': {
      get: { tags: ['Purchase Orders'], summary: 'Get all purchase orders', responses: { 200: { description: 'List of purchase orders' } } },
      post: {
        tags: ['Purchase Orders'],
        summary: 'Create a new purchase order',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Purchase order created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/purchase-orders/{id}': {
      get: {
        tags: ['Purchase Orders'],
        summary: 'Get purchase order by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Purchase order found' }, 404: { description: 'Purchase order not found' } },
      },
      patch: {
        tags: ['Purchase Orders'],
        summary: 'Update a purchase order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Purchase order updated' }, 404: { description: 'Purchase order not found' } },
      },
      delete: {
        tags: ['Purchase Orders'],
        summary: 'Delete a purchase order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Purchase order deleted' }, 404: { description: 'Purchase order not found' } },
      },
    },
    '/api/import-batches': {
      get: { tags: ['Import Batches'], summary: 'Get all import batches', responses: { 200: { description: 'List of import batches' } } },
      post: {
        tags: ['Import Batches'],
        summary: 'Create a new import batch',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Import batch created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/import-batches/{id}': {
      get: {
        tags: ['Import Batches'],
        summary: 'Get import batch by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Import batch found' }, 404: { description: 'Import batch not found' } },
      },
      patch: {
        tags: ['Import Batches'],
        summary: 'Update an import batch',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Import batch updated' }, 404: { description: 'Import batch not found' } },
      },
      delete: {
        tags: ['Import Batches'],
        summary: 'Delete an import batch',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Import batch deleted' }, 404: { description: 'Import batch not found' } },
      },
    },
    '/api/coupons': {
      get: { tags: ['Coupons'], summary: 'Get all coupons', responses: { 200: { description: 'List of coupons' } } },
      post: {
        tags: ['Coupons'],
        summary: 'Create a new coupon',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Coupon created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/coupons/{id}': {
      get: {
        tags: ['Coupons'],
        summary: 'Get coupon by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Coupon found' }, 404: { description: 'Coupon not found' } },
      },
      patch: {
        tags: ['Coupons'],
        summary: 'Update a coupon',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Coupon updated' }, 404: { description: 'Coupon not found' } },
      },
      delete: {
        tags: ['Coupons'],
        summary: 'Delete a coupon',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Coupon deleted' }, 404: { description: 'Coupon not found' } },
      },
    },
    '/api/orders': {
      get: { tags: ['Orders'], summary: 'Get all orders', responses: { 200: { description: 'List of orders' } } },
      post: {
        tags: ['Orders'],
        summary: 'Create a new order',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Order created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'Get order by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Order found' }, 404: { description: 'Order not found' } },
      },
      patch: {
        tags: ['Orders'],
        summary: 'Update an order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Order updated' }, 404: { description: 'Order not found' } },
      },
      delete: {
        tags: ['Orders'],
        summary: 'Delete an order',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Order deleted' }, 404: { description: 'Order not found' } },
      },
    },
    '/api/order-details': {
      get: { tags: ['Order Details'], summary: 'Get all order details', responses: { 200: { description: 'List of order details' } } },
      post: {
        tags: ['Order Details'],
        summary: 'Create a new order detail',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 201: { description: 'Order detail created' }, 400: { description: 'Invalid input' } },
      },
    },
    '/api/order-details/{id}': {
      get: {
        tags: ['Order Details'],
        summary: 'Get order detail by ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Order detail found' }, 404: { description: 'Order detail not found' } },
      },
      patch: {
        tags: ['Order Details'],
        summary: 'Update an order detail',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/Resource' } } } },
        responses: { 200: { description: 'Order detail updated' }, 404: { description: 'Order detail not found' } },
      },
      delete: {
        tags: ['Order Details'],
        summary: 'Delete an order detail',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Order detail deleted' }, 404: { description: 'Order detail not found' } },
      },
    },
  },
};

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
}

module.exports = {
  setupSwagger,
  specs,
};
