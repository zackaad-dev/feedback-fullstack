# Deployment Guide

This document describes how to deploy the **Feedback** application using Docker and a single-domain Nginx reverse proxy on DigitalOcean or any Linux VPS.

---

## 1. Single-Domain Architecture Overview

Everything lives under a single domain (**`feedback.mydomain.com`**):
- **Web App (Frontend)**: Serves static React SPA via Nginx container at `https://feedback.mydomain.com/`
- **REST API (Backend)**: Mounted at `https://feedback.mydomain.com/api/v1`
- **Swagger Documentation**: Accessible at `https://feedback.mydomain.com/api/docs`

Because Express routes are mounted at `/api/v1/...`, requests to `/api` pass through directly to the backend container with zero path rewriting required.

---

## 2. Environment Configuration

### Frontend Environment Variable
In `frontend/.env` (or environment configuration):
```env
VITE_API_BASE_URL=https://feedback.mydomain.com/api/v1
```

### Backend Environment Variables
In `docker-compose.yml` or `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://mongo:27017/feedback
NODE_ENV=production
JWT_SECRET=your_secure_production_jwt_secret
```

---

## 3. Host Nginx Reverse Proxy & SSL Setup

### Step 1: Install Nginx & Certbot on Host
```bash
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx
```

### Step 2: Issue SSL Certificate for Single Domain
Issue an SSL certificate for `feedback.mydomain.com`:
```bash
sudo certbot certonly --nginx -d feedback.mydomain.com
```

### Step 3: Configure Host Nginx
Copy [docs/nginx.conf](./nginx.conf) to `/etc/nginx/sites-available/feedback.conf`:
```bash
sudo cp docs/nginx.conf /etc/nginx/sites-available/feedback.conf
sudo ln -s /etc/nginx/sites-available/feedback.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4. Docker Compose Deployment

### Step 1: Start Docker Containers
```bash
docker compose up -d --build
```

### Step 2: Seed Production Database
```bash
docker compose exec backend pnpm run seed
```

---

## 5. Verification

- Web Client: `https://feedback.mydomain.com`
- Backend API Health: `https://feedback.mydomain.com/api/v1/health`
- Swagger Specs: `https://feedback.mydomain.com/api/docs`
