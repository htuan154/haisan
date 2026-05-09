# Swagger API Documentation Guide

## Overview
The API is now documented with Swagger (OpenAPI 3.0) for easy testing and exploration.

## Prerequisites: Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
PORT=3000
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-long-random-secret-key
JWT_EXPIRES_IN=7d
```

**For Development:** You can use mock values (they won't connect to Supabase but allow the server to run):
```bash
PORT=3000
SUPABASE_URL=https://mock-supabase.supabase.co
SUPABASE_ANON_KEY=mock-anon-key
SUPABASE_SERVICE_ROLE_KEY=mock-role-key
JWT_SECRET=dev-secret-12345
JWT_EXPIRES_IN=7d
```

## Accessing Swagger UI

1. **Start the backend server:**
   ```bash
   npm start
   ```

2. **Open Swagger UI in your browser:**
   - Navigate to: `http://localhost:3000/api-docs`
   
   Or if using port 5000:
   - Navigate to: `http://localhost:5000/api-docs`

## Available Endpoints

### Authentication Endpoints
- **POST `/api/auth/register`** - Register a new user
  - Body: `{ email: string, password: string }`
  - Returns: User object + JWT token

- **POST `/api/auth/login`** - Login user
  - Body: `{ email: string, password: string }`
  - Returns: User object + JWT token

### Resource Endpoints (Separated by Table)

Each resource has its own section in Swagger for easy testing:

**Accounts** - `GET /api/accounts`, `POST /api/accounts`, `GET /api/accounts/:id`, `PATCH /api/accounts/:id`, `DELETE /api/accounts/:id`

**Catalog** - `GET /api/catalog`, `POST /api/catalog`, `GET /api/catalog/:id`, `PATCH /api/catalog/:id`, `DELETE /api/catalog/:id`

**Customer Service** - `GET /api/customerService`, `POST /api/customerService`, `GET /api/customerService/:id`, `PATCH /api/customerService/:id`, `DELETE /api/customerService/:id`

**Inventory** - `GET /api/inventory`, `POST /api/inventory`, `GET /api/inventory/:id`, `PATCH /api/inventory/:id`, `DELETE /api/inventory/:id`

**Sales** - `GET /api/sales`, `POST /api/sales`, `GET /api/sales/:id`, `PATCH /api/sales/:id`, `DELETE /api/sales/:id`

Each section contains CRUD operations (Create, Read, Update, Delete) for testing individual endpoints.

## Testing with Swagger UI

1. Click on an endpoint to expand it
2. Click "Try it out" button
3. Fill in parameters and request body
4. Click "Execute" to send the request
5. View the response

## Getting the JSON Spec

- Raw OpenAPI JSON: `http://localhost:3000/api-docs.json`

## Notes
- Authorization headers can be set in Swagger UI for JWT bearer tokens
- All endpoints support JSON request/response
- Health check available at: `GET /health`
