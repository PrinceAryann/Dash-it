# Deployment Restructure Guide

## Architecture Overview
The Dash-it portfolio has been restructured into a clean Monorepo to support split deployment:
- **Frontend (`/frontend`)**: React + Vite application meant to be deployed to **Vercel**.
- **Backend (`/backend`)**: FastAPI application meant to be deployed to **Render** (as a Web Service).
- **Database**: PostgreSQL hosted on **Render** or Supabase.

## Vercel Setup (Frontend)
1. Connect your GitHub repository to Vercel.
2. Select the `/frontend` directory as the Root Directory.
3. Vercel will automatically detect Vite. The build command is `npm run build` and output directory is `dist`.
4. Set the environment variables in Vercel according to `frontend/.env.example`.
   - Ensure `VITE_API_BASE_URL` points to your deployed Render backend (e.g., `https://dash-it-api.onrender.com/api`).
5. A `vercel.json` is already included to handle SPA routing and security headers.

## Render Setup (Backend)
1. Connect your GitHub repository to Render.
2. The provided `render.yaml` Blueprint file will automatically configure the Web Service and PostgreSQL database.
   - Go to Render Dashboard -> Blueprints -> New Blueprint Instance -> Select Repository.
3. Render will provision `dash-it-api` (Python 3.11, Gunicorn) and `dash-it-db`.
4. Environment variables will be populated, but you must manually set your `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the Render dashboard for the API service.
5. The deployment automatically runs `alembic upgrade head` before starting Gunicorn.

## Initializing the Admin Account
Once the backend is deployed, you must seed the admin account.
You can use Render's Shell or SSH to run:
```bash
python scripts/seed_admin.py
```
This will securely read the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables and create the account.

## Local Development
Local development now strictly uses `docker-compose.dev.yml` in the `/backend` folder.
```bash
cd backend
docker-compose -f docker-compose.dev.yml up -d --build
```
This boots PostgreSQL and the FastAPI backend. You must run the frontend separately via `npm run dev` in the `/frontend` directory.
