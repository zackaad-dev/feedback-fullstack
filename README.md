# Feedback Blogging Platform

**Feedback** is a full-stack blogging platform with user authentication, posts, comments, and likes.

This project originally started as **Nest Forum**, a project I built last year while learning the MERN stack. Rather than starting over, I decided to revisit it and refactor the existing codebase. The core functionality is mostly the same, but much of the project has been reorganized, modernized, and documented to improve maintainability and make it easier to develop and deploy.

---

## Changes

Some of the larger changes in this version include:

- Renamed the project from **Nest Forum** to **Feedback**.
- Added a `docs/` directory covering architecture, API endpoints, local development, CI/CD, and deployment.
- Migrated the project from `npm` to `pnpm`.
- Rebuilt the frontend with React 19, TypeScript, and Material UI, including a simplified black-and-white theme with light and dark mode support.
- Converted the backend from JavaScript to TypeScript.
- Reorganized the backend into separate routes, controllers, services, and models.
- Standardized backend file naming (for example, `post.controller.ts` instead of `postController.js`).
- Added Swagger/OpenAPI documentation available at `/api/docs`.
- Dockerized the application and added deployment documentation for DigitalOcean.
- Improved the like/unlike implementation with proper database constraints and immediate UI updates.

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Material UI
- React Router v7

### Backend

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

### Tooling

- pnpm
- Docker & Docker Compose
- GitHub Actions
- Swagger / OpenAPI

---

## Project Structure

```text
feedback/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
├── docs/
│   ├── architecture.md
│   ├── api-guide.md
│   ├── setup-guide.md
│   ├── cicd.md
│   └── deployment.md
│
└── docker-compose.yml
```

---

## Getting Started

### Backend

```bash
cd backend
pnpm install
pnpm run dev
```

API: `http://localhost:5000/api/v1`

Swagger: `http://localhost:5000/api/docs`

### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```

Application: `http://localhost:5173`

---

## Documentation

Additional documentation is available in the `docs/` directory.

- Architecture
- API Reference
- Local Setup
- CI/CD
- Deployment

---

This refactor was primarily about improving the project itself rather than adding new features. The goal was to clean up the architecture, migrate to TypeScript, improve documentation, and bring the codebase closer to how I would structure a similar project today.
