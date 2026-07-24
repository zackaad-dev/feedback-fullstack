# CI/CD Documentation

## Overview

The repository uses GitHub Actions (`.github/workflows/ci-cd.yml`) to enforce code quality, run automated tests, and handle production deployments.

---

## Workflow Triggers

The CI/CD pipeline runs on:
- Pushes to `main` and `dev` branches
- Pull Requests targeting `main` and `dev` branches

---

## Jobs Breakdown

### 1. `backend-ci` (Both `dev` & `main`)
- Sets up Node.js v20 environment.
- Installs dependencies using `npm ci`.
- Runs backend test and syntax validation scripts (`npm test`).

### 2. `frontend-ci` (Both `dev` & `main`)
- Sets up Node.js v20 environment.
- Installs frontend dependencies using `npm ci`.
- Runs Oxlint code linter (`npm run lint`).
- Validates Vite production build (`npm run build`).

### 3. `deploy-main` (`main` branch pushes only)
- Runs after `backend-ci` and `frontend-ci` complete successfully.
- Deploys application production artifacts.
