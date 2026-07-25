# CI/CD Documentation

## Overview

The repository uses GitHub Actions (`.github/workflows/ci-cd.yml`) with `pnpm` to enforce type safety, code quality, automated testing, and production deployments.

---

## Workflow Triggers

The CI/CD pipeline runs on:
- Pushes to `main` and `dev` branches
- Pull Requests targeting `main` and `dev` branches

---

## Environment & Compatibility

- **Node.js**: v22 LTS (Required for pnpm v10+ `node:sqlite` native support).
- **Package Manager**: `pnpm` v10 (`pnpm/action-setup@v4`).

---

## Jobs Breakdown

### 1. `backend-ci` (Both `dev` & `main`)
- Sets up Node.js v22 and `pnpm` v10.
- Installs dependencies using `pnpm install --frozen-lockfile`.
- Runs TypeScript type-checking and build validation (`pnpm test && pnpm build`).

### 2. `frontend-ci` (Both `dev` & `main`)
- Sets up Node.js v22 and `pnpm` v10.
- Installs dependencies using `pnpm install --frozen-lockfile`.
- Runs Oxlint code linter (`pnpm run lint`).
- Validates Vite production build (`pnpm run build`).

### 3. `deploy-main` (`main` branch pushes only)
- Runs after `backend-ci` and `frontend-ci` complete successfully.
- Deploys application production artifacts.
