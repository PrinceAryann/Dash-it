# Environment Variables Reference

## Frontend (`frontend/.env.example`)

| Variable | Description | Required | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | The URL of the FastAPI backend. | **Yes** | `https://api.dashit.com/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image loading. | No | `dxtq89` |
| `VITE_SITE_URL` | The public URL of the frontend. | **Yes** | `https://dashit.com` |
| `VITE_SITE_NAME` | Website name. | No | `Dash-it Portfolio` |

## Backend (`backend/.env.example`)

| Variable | Description | Required | Example |
|---|---|---|---|
| `DATABASE_URL` | Connection string for PostgreSQL. | **Yes** | `postgresql+asyncpg://user:pass@host/db` |
| `SECRET_KEY` | General cryptographic secret key. | **Yes** | `(random 32 byte string)` |
| `JWT_SECRET_KEY` | Secret key for signing Access Tokens. | **Yes** | `(random 32 byte string)` |
| `JWT_REFRESH_SECRET_KEY` | Secret key for signing Refresh Tokens. | **Yes** | `(random 32 byte string)` |
| `ADMIN_EMAIL` | Administrator login email. | **Yes** | `admin@example.com` |
| `ADMIN_PASSWORD` | Administrator login password. | **Yes** | `SuperSecurePassword123!` |
| `ADMIN_NAME` | Administrator display name. | No | `John Doe` |
| `FRONTEND_URL` | Allowed CORS origin (Vercel URL). | **Yes** | `https://dashit.com` |
| `BACKEND_URL` | The public URL of the backend. | **Yes** | `https://api.dashit.com` |
| `MAIL_USERNAME` | SMTP User. | No | `apikey` |
| `MAIL_PASSWORD` | SMTP Password. | No | `(sendgrid/resend key)` |
| `MAIL_SERVER` | SMTP Server Host. | No | `smtp.resend.com` |
| `MAIL_PORT` | SMTP Port. | No | `587` |
| `MAIL_FROM` | From email address. | No | `noreply@dashit.com` |
| `CLOUDINARY_*` | Cloudinary API credentials for backend uploads. | No | `...` |
