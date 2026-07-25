# System Architecture

## Overview

Feedback is a full-stack blogging platform built with an end-to-end TypeScript architecture:
- **Frontend**: Single Page Application (SPA) built with React 19, TypeScript, Vite, and Material-UI (MUI).
- **Backend**: RESTful API server built with Node.js, Express, TypeScript (`ts-node`/`tsc`), and MongoDB (via Mongoose).
- **Package Manager**: `pnpm` for fast, efficient dependency management across backend and frontend modules.
- **CI/CD**: GitHub Actions workflow automation using `pnpm` for testing, type-checking, and deployment.

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
|             Express Server (Node.js + TS)             |
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
|  |      Models      |  (Mongoose TS Schemas)      |
|  +--------+---------+                             |
+-----------|-------------------------------------------+
            |
            v
+-----------------------+
|    MongoDB Database   |
+-----------------------+
```

---

## Layered Backend Architecture (TypeScript)

The backend follows a strict 3-layer architecture pattern written in TypeScript:

1. **Routes Layer (`/src/routes/*.ts`)**
   - Defines Express endpoint URIs and mounts route handlers.
   - Attaches validation rules (`express-validator`) and authentication middleware.

2. **Controller Layer (`/src/controllers/*.ts`)**
   - Handles HTTP request parsing (`req.body`, `req.params`) and type-safe responses.
   - Delegates business operations to the Service layer and returns typed HTTP responses (`200`, `201`, `400`, `401`, `500`).

3. **Service Layer (`/src/services/*.ts`)**
   - Encapsulates business logic, domain error handling, password hashing (`bcryptjs`), and JWT token generation (`jsonwebtoken`).
   - Interacts directly with typed Mongoose models.

4. **Model Layer (`/src/models/*.ts`)**
   - Defines Mongoose schemas (`User.ts`, `Post.ts`, `Comment.ts`, `Counter.ts`, `Like.ts`) and document interfaces.
