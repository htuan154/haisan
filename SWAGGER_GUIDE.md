# Swagger API Documentation Guide

## Overview
The API is now documented with Swagger (OpenAPI 3.0) for easy testing and exploration.

## Accessing Swagger UI

1. **Start the backend server:**
   ```bash
   npm run dev
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

### Resource Endpoints
Dynamic CRUD endpoints for: accounts, catalog, customerService, inventory, sales

- **GET `/api/{resource}`** - List all resources
- **GET `/api/{resource}/:id`** - Get specific resource
- **POST `/api/{resource}`** - Create new resource
- **PATCH `/api/{resource}/:id`** - Update resource
- **DELETE `/api/{resource}/:id`** - Delete resource

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
