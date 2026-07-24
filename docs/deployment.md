# Deployment Guide

This document describes how to deploy the Feedback application using Docker and DigitalOcean.

---

## 1. Overview

The Feedback project is fully containerized using Docker and Docker Compose. It can be deployed to:
- **DigitalOcean Droplet** (via Docker Compose)
- **DigitalOcean App Platform** (via Dockerfiles)

---

## 2. Docker Architecture

The root `docker-compose.yml` orchestrates 3 main services:
1. **MongoDB Database (`mongo`)**: Document store on port `27017`.
2. **Backend API (`backend`)**: Express + TypeScript service built from `backend/Dockerfile` running on port `5000`.
3. **Frontend Application (`frontend`)**: React + Vite SPA built from `frontend/Dockerfile` running on port `3000` (Nginx).

---

## 3. Deploying to DigitalOcean Droplet

### Step 1: Provision Droplet
1. Create an **Ubuntu 22.04 / 24.04 LTS Droplet** on DigitalOcean.
2. Install Docker and Docker Compose:
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-v2
   ```

### Step 2: Clone & Configure Environment
```bash
git clone https://github.com/your-username/feedback.git
cd feedback

cp .env.example .env
# Edit production secrets in .env
```

### Step 3: Launch Containers
```bash
docker compose up -d --build
```

---

## 4. Environment Variables

| Variable | Description | Production Default |
|---|---|---|
| `PORT` | Backend HTTP Port | `5000` |
| `MONGO_URI` | MongoDB Connection URI | `mongodb://mongo:27017/feedback` |
| `JWT_SECRET` | Secret key for JWT tokens | *Secret production key* |
| `VITE_API_BASE_URL` | Frontend API Base URL | `https://api.yourdomain.com/api/v1` |

---

## 5. Verification & Monitoring

- Check active containers: `docker compose ps`
- View backend logs: `docker compose logs -f backend`
- Swagger Documentation: `http://<DROPLET_IP>:5000/api/docs`
