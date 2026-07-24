# Feedback Blogging Platform

Feedback is a modern blogging platform built with a fully typed TypeScript architecture featuring a React SPA frontend and a Node.js/Express REST API backend with MongoDB.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Material-UI (MUI), React Router v7
- **Backend**: Node.js, TypeScript (`ts-node`/`tsc`), Express, MongoDB (Mongoose), JWT Authentication, bcryptjs
- **Package Manager**: `pnpm` (Fast, disk-space efficient package manager)
- **API Documentation**: Swagger / OpenAPI 3.0 via `swagger-ui-express`
- **CI/CD & DevOps**: GitHub Actions, Docker Compose

---

## 📂 Directory Structure

```text
feedback/
├── backend/                  # Node.js + Express TypeScript REST API
│   ├── src/
│   │   ├── config/           # Database (db.ts) & Swagger (swagger.ts) configuration
│   │   ├── controllers/      # Route request controllers (auth.controller.ts, post.controller.ts)
│   │   ├── services/         # Domain & business logic layer (auth.service.ts, post.service.ts)
│   │   ├── models/           # Mongoose TypeScript schemas (User.ts, Post.ts, Comment.ts)
│   │   ├── routes/           # Express endpoint definitions (auth.ts, posts.ts)
│   │   ├── middleware/       # JWT authentication middleware (auth.ts)
│   │   └── server.ts         # Main Express TypeScript application entry point
│   ├── tsconfig.json         # Backend TypeScript compiler configuration
│   └── package.json
├── frontend/                 # React 19 + TypeScript + Vite Client
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page view components (Login, Register, Dashboard)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── api/              # HTTP API client services
│   │   └── App.tsx           # React router app root
│   └── package.json
├── docs/                     # Technical documentation
│   ├── architecture.md       # System design & TypeScript architecture details
│   ├── api-guide.md          # REST API endpoints & Swagger info
│   ├── setup-guide.md        # Detailed environment & local setup steps using pnpm
│   └── cicd.md               # GitHub Actions pipeline workflow documentation using pnpm
└── .github/workflows/        # CI/CD workflows
    └── ci-cd.yml
```

---

## ⚡ Quick Start

### 1. Environment Setup
Copy or create `.env.development` in the root directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback
JWT_SECRET=dev_secret_change_me
```

### 2. Start Backend Server (`pnpm`)
```bash
cd backend
pnpm install
pnpm run dev
```
- API Base URL: `http://localhost:5000/api/v1`
- Interactive Swagger Documentation: `http://localhost:5000/api/docs`

### 3. Start Frontend Client (`pnpm`)
```bash
cd frontend
pnpm install
pnpm run dev
```
- Web Client URL: `http://localhost:5173`

---

## 📖 Documentation

For detailed development guides and system references, check the [`docs/`](./docs) folder:

- 🏗️ [Architecture Guide](./docs/architecture.md)
- 🔌 [API & Endpoint Guide](./docs/api-guide.md)
- 🛠️ [Setup & Environment Guide](./docs/setup-guide.md)
- 🔄 [CI/CD Workflow Documentation](./docs/cicd.md)
