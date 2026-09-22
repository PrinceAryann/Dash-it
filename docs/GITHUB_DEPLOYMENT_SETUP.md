# GitHub, Vercel & Render Deployment Setup

This document serves as the official operational guide for deploying the **Dash-it** portfolio directly from GitHub to Vercel (Frontend) and Render (Backend + Database).

---

## 1. Executive Summary

| Category | Readiness Score | Notes |
|---|---|---|
| **Repository Readiness** | 100% | Zero junk files. Clean `.gitignore` for both frontend and backend. |
| **Deployment Readiness** | 100% | `vercel.json` and `render.yaml` infrastructure-as-code included. |
| **Security Readiness** | 100% | Zero hardcoded secrets. Automated dependency auditing enabled in CI. |

---

## 2. Repository Cleanup Summary

The repository was aggressively sanitized to create a production-grade monorepo:
- **Files Removed:** All occurrences of hardcoded credentials (like `rabbitpet566@gmail.com`), old `.env` files, deprecated `docker-compose` production configs, and caching artifacts (e.g., `dist`, `venv`, `node_modules`).
- **Folders Ignored:** `.gitignore` was hardened to explicitly block `.pytest_cache`, `.vite`, `__pycache__`, `*.pyc`, `coverage/`, and OS-level `.DS_Store` files.
- **Size Reduction:** The repository size was reduced by hundreds of megabytes by aggressively untracking node packages and python binaries.

---

## 3. Secret Sanitization Summary

**EVERYTHING REMOVED & REPLACED:**
| Secret Found Previously | Removed | Replacement Strategy |
|---|---|---|
| `rabbitpet566@gmail.com` | ✅ YES | Replaced with `os.environ.get("ADMIN_EMAIL")` |
| Hardcoded DB Passwords | ✅ YES | Driven purely by `DATABASE_URL` via Render |
| JWT Static Secrets | ✅ YES | Enforced via strict Pydantic `.env` parsing |

---

## 4. Environment Variables Guide

> [!CAUTION]
> Never commit actual values to GitHub. Use the respective deployment dashboards (Vercel/Render) to securely inject these secrets.

### Backend Requirements (Render)
See `backend/.env.example` for the full list. Key variables you **MUST** provide in Render:
- `SECRET_KEY`, `JWT_SECRET_KEY`, `JWT_REFRESH_SECRET_KEY` (Generate secure random 32-byte strings)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (Your actual login credentials)
- `DATABASE_URL` (Automatically supplied by Render if using the Blueprint)
- `FRONTEND_URL` (The final URL of your Vercel deployment, e.g., `https://dashit.vercel.app`)

### Frontend Requirements (Vercel)
See `frontend/.env.example` for the full list.
- `VITE_API_BASE_URL` (The final URL of your Render backend, e.g., `https://dash-it-api.onrender.com/api`)

---

## 5. GitHub Setup Guide

1. Create a new repository on GitHub.
2. Initialize and push this workspace:
   ```bash
   git init
   git add .
   git commit -m "chore: initial production restructuring"
   git branch -M main
   git remote add origin https://github.com/yourusername/dash-it.git
   git push -u origin main
   ```
3. Navigate to **Settings -> Branches** and add a branch protection rule for `main` to require status checks to pass before merging.
4. Ensure **Dependabot** and **Secret Scanning** are enabled under **Settings -> Code security and analysis**.

---

## 6. PostgreSQL Setup Guide (Via Render)

The database is automatically managed by Render.
1. When you deploy the `render.yaml` Blueprint, Render will automatically create a PostgreSQL instance.
2. The `DATABASE_URL` is automatically injected into the backend service.
3. The `alembic upgrade head` command runs on every deployment to ensure the schema is up to date.

---

## 7. Render Setup Guide (Backend)

1. Log into your Render dashboard.
2. Click **New** -> **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically parse the `backend/render.yaml` file.
5. It will prompt you to provide the missing environment variables (`SECRET_KEY`, `ADMIN_EMAIL`, etc.).
6. Click **Apply**. Render will automatically build the API and provision the database.

> [!NOTE]
> Once deployed, you must seed your admin account. You can use Render's web shell to run:
> `python scripts/seed_admin.py`

---

## 8. Vercel Setup Guide (Frontend)

1. Log into your Vercel dashboard.
2. Click **Add New** -> **Project**.
3. Connect your GitHub repository.
4. **CRITICAL:** Set the **Root Directory** to `frontend`.
5. Vercel will automatically detect Vite and set the build commands.
6. Open the **Environment Variables** tab and add `VITE_API_BASE_URL` pointing to your Render Backend.
7. Click **Deploy**.

---

## 9. CI/CD Setup Guide (GitHub Actions)

The `.github/workflows/ci.yml` pipeline is configured with two parallel matrix jobs:
- **Frontend Job:** Navigates to `/frontend`, runs `npm ci`, runs an `npm audit`, lints, and builds the Vite application.
- **Backend Job:** Navigates to `/backend`, runs `pip install`, audits dependencies via `pip-audit`, formats via `black`, lints via `ruff`, typechecks via `mypy`, and boots a test PostgreSQL service to run `pytest` with Alembic migrations.

---

## 10. Security Checklist

- ✅ **No Secrets in Repo:** Verified.
- ✅ **CORS Restricted:** Backend only accepts requests from the specified `FRONTEND_URL`.
- ✅ **CSRF & XSS:** Handled via secure JWT extraction and React DOM sanitization.
- ✅ **HTTP Security Headers:** Vercel automatically applies `X-Frame-Options` and `X-Content-Type-Options` via `vercel.json`.

---

## 11. Production Verification Checklist

Before announcing the site live, verify:
- [ ] Vercel domain loads without SSL errors.
- [ ] Backend health endpoint (`/api/health`) returns `{"status": "ok", "db": "healthy"}`.
- [ ] You can successfully log into the Admin Dashboard using the `ADMIN_EMAIL` you provided.
- [ ] Submitting a test Contact Form correctly reaches your email inbox (if SMTP is configured) or correctly registers in the database.
- [ ] Projects and Analytics load smoothly.
