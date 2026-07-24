# System Architecture

## Overview

Feedback is a full-stack blogging platform built with a decoupled client-server architecture:
- **Frontend**: Single Page Application (SPA) built with React 19, TypeScript, Vite, and Material-UI (MUI).
- **Backend**: RESTful API server built with Node.js, Express, and MongoDB (via Mongoose).
- **CI/CD**: GitHub Actions workflow automation for testing, linting, and deployment.

---

## High-Level Architecture Diagram

```
+-------------------------------------------------------+
|                    Browser Client                     |
|            (React 19 + TypeScript + Vite)             |
+---------------------------+---------------------------+
                            |
                     HTTP / REST API
                            |
                            v
+-------------------------------------------------------+
|                 Express Server (Node.js)              |
|                                                       |
|  +------------------+  +---------------------------+  |
|  |  Routes (/api/v1)|  |  Swagger Docs (/api/docs) |  |
|  +--------+---------+  +---------------------------+  |
|           |                                           |
|           v                                           |
|  +------------------+                             |
|  |   Controllers    |  (HTTP validation & parsing) |
|  +--------+---------+                             |
|           |                                           |
|           v                                           |
|  +------------------+                             |
|  |     Services     |  (Business logic & auth)    |
|  +--------+---------+                             |
|           |                                           |
|           v                                           |
|  +------------------+                             |
|  |      Models      |  (Mongoose Schemas)          |
|  +--------+---------+                             |
+-----------|-------------------------------------------+
            |
            v
+-----------------------+
|    MongoDB Database   |
+-----------------------+
```

---

## Layered Backend Architecture

The backend follows a standard 3-layer architecture pattern to maintain separation of concerns:

1. **Routes Layer (`/src/routes`)**
   - Defines Express endpoint URIs and mounts route handlers.
   - Attaches validation rules (e.g. `express-validator`) and authentication middleware.

2. **Controller Layer (`/src/controllers`)**
   - Handles HTTP request parsing (`req.body`, `req.params`) and validation result handling.
   - Delegates business operations to the Service layer and returns HTTP responses (`200`, `201`, `400`, `401`, `500`).

3. **Service Layer (`/src/services`)**
   - Encapsulates business logic, domain error handling, and password hashing (`bcryptjs`) / JWT token generation (`jsonwebtoken`).
   - Interacts directly with database models.

4. **Model Layer (`/src/models`)**
   - Defines Mongoose schemas (`User`, `Post`, `Comment`, `Counter`, `Like`) and DB lifecycle hooks.
