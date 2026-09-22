from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError
from pydantic import ValidationError
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
import ssl

from app.core.config import settings
from app.models.user import AdminUser

# ==========================================================
# Database Engine (Render + Aiven + asyncpg SSL Compatible)
# ==========================================================

database_url = settings.DATABASE_URL
connect_args = {}

# Aiven PostgreSQL uses SSL. asyncpg doesn't accept sslmode=require in URL.
if database_url.startswith("postgresql+asyncpg://") and "sslmode=require" in database_url:
    database_url = database_url.replace("?sslmode=require", "")

    ssl_context = ssl.create_default_context()
    connect_args["ssl"] = ssl_context

engine = create_async_engine(
    database_url,
    echo=False,
    pool_pre_ping=True,
    pool_recycle=300,
    pool_size=5,
    max_overflow=10,
    connect_args=connect_args,
)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# ==========================================================
# Database Dependency
# ==========================================================

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# ==========================================================
# Authentication Helpers
# ==========================================================

def get_token_from_cookie(request: Request) -> str:
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )

    return token


async def get_current_admin(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(get_token_from_cookie),
) -> AdminUser:
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=["HS256"],
        )

        user_id: str = payload.get("sub")
        token_version: int = payload.get("token_version", 0)

        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Could not validate credentials",
            )

    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )

    user = await db.scalar(
        select(AdminUser).where(AdminUser.id == user_id)
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user",
        )

    if user.token_version != token_version:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or revoked",
        )

    return user