# Feedback Blogging Platform

Feedback is a modern blogging platform built with a decoupled architecture featuring a React SPA frontend and a Node.js/Express backend with MongoDB.

---

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Material-UI (MUI), React Router v7
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Authentication, bcryptjs
- **API Documentation**: Swagger / OpenAPI 3.0 via `swagger-ui-express`
- **CI/CD & DevOps**: GitHub Actions, Docker Compose

---

## 📂 Directory Structure

```text
feedback/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/           # Database & Swagger configuration
│   │   ├── controllers/      # Route request controllers
│   │   ├── services/         # Domain & business logic layer
│   │   ├── models/           # Mongoose schemas (User, Post, Comment)
│   │   ├── routes/           # Express endpoint definitions
│   │   ├── middleware/       # JWT authentication middleware
│   │   └── server.js         # Main Express application entry point
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
│   ├── architecture.md       # System design & architecture details
│   ├── api-guide.md          # REST API endpoints & Swagger info
│   ├── setup-guide.md        # Detailed environment & local setup steps
│   └── cicd.md               # GitHub Actions pipeline workflow documentation
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

### 2. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
- API Base URL: `http://localhost:5000/api/v1`
- Interactive Swagger Documentation: `http://localhost:5000/api/docs`

### 3. Start Frontend Client
```bash
cd frontend
npm install
npm run dev
```
- Web Client URL: `http://localhost:5173`

---

## 📖 Documentation

For detailed development guides and system references, check the [`docs/`](./docs) folder:

- 🏗️ [Architecture Guide](./docs/architecture.md)
- 🔌 [API & Endpoint Guide](./docs/api-guide.md)
- 🛠️ [Setup & Environment Guide](./docs/setup-guide.md)
- 🔄 [CI/CD Workflow Documentation](./docs/cicd.md)
