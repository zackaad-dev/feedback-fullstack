# Setup & Local Development Guide

## Prerequisites

Ensure you have the following tools installed on your development machine:
- **Node.js**: `v20.x` or later
- **npm**: `v10.x` or later
- **MongoDB**: Local MongoDB instance running on `mongodb://localhost:27017` or MongoDB Atlas URI
- **Docker & Docker Compose** (optional, for containerized execution)

---

## Environment Setup

Create `.env.development` in the project root:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback
JWT_SECRET=dev_secret_change_me
```

---

## Local Development Steps

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server starts at `http://localhost:5000`.
- Swagger API Docs: `http://localhost:5000/api/docs`
- Health Check: `http://localhost:5000/api/v1/health`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The Vite frontend server starts at `http://localhost:5173`.

---

## Running with Docker Compose

To start both frontend and backend using Docker Compose:

```bash
docker-compose up --build
```
