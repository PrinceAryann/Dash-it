from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.core.config import settings
from app.core.rate_limit import limiter
from app.api.routers import api_router
from app.api.deps import get_db
from loguru import logger
import sys
import uuid
import contextvars
from sqlalchemy import text
from prometheus_fastapi_instrumentator import Instrumentator

# Configure Loguru and correlation ID
request_id_context = contextvars.ContextVar("request_id", default="")

logger.remove()
def format_record(record):
    req_id = request_id_context.get()
    req_id_str = f" [{req_id}]" if req_id else ""
    return f"{{time:YYYY-MM-DD HH:mm:ss}} | {{level: <8}} | {{name}}:{{function}}:{{line}}{req_id_str} - {{message}}\n"

logger.add(sys.stderr, format=format_record, level="INFO")
logger.add("logs/app.log", rotation="10 MB", level="DEBUG", format=format_record)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 1. Correlation ID & Security Headers Middleware (MID-001, LOG-001)
@app.middleware("http")
async def add_security_headers_and_request_id(request: Request, call_next):
    req_id = str(uuid.uuid4())
    request_id_context.set(req_id)
    
    response = await call_next(request)
    
    # Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    
    # Correlation ID Header
    response.headers["X-Request-ID"] = req_id
    
    return response

# 2. CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Prometheus Metrics (OPS-003)
Instrumentator().instrument(app).expose(app, endpoint="/metrics", include_in_schema=False)

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to Dash-it API"}

@app.get("/api/health")
async def health_check():
    # Advanced health probe (API-001)
    from app.api.deps import AsyncSessionLocal
    async with AsyncSessionLocal() as session:
        try:
            await session.execute(text("SELECT 1"))
            return {"status": "ok", "db": "healthy"}
        except Exception as e:
            logger.error(f"Healthcheck DB connection failed: {e}")
            return JSONResponse(status_code=503, content={"status": "error", "db": "unhealthy"})

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    req_id = request_id_context.get()
    logger.exception(f"Unhandled exception: {exc}")
    
    headers = {"X-Request-ID": req_id} if req_id else {}
    return JSONResponse(
        status_code=500,
        content={
            "detail": "Internal server error",
            "reference_id": req_id
        },
        headers=headers
    )
