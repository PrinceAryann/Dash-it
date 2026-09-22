from fastapi import Depends, HTTPException, Request, status
from jose import JWTError, jwt
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import ssl

from app.core.config import settings
from app.models.user import AdminUser

# ==========================================================
# Database Engine (Render + Aiven PostgreSQL + asyncpg)
# ==========================================================

database_url = settings.DATABASE_URL
connect_args = {}

# Aiven PostgreSQL requires SSL.
# asyncpg doesn't understand "sslmode=require" in the URL.
if database_url.startswith("postgresql+asyncpg://"):
    database_url = database_url.replace("?sslmode=require", "")

    # SSL context for Render -> Aiven connection
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

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