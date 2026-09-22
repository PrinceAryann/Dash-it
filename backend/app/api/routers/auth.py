from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta, timezone

from app.api.deps import get_db
from app.core.security import create_access_token, create_refresh_token
from app.services.auth_service import auth_service
from app.repositories.refresh_token_repository import refresh_token_repo
from app.models.user import RefreshToken, AdminUser
from pydantic import BaseModel
from sqlalchemy import select
import hashlib

from app.core.rate_limit import limiter

router = APIRouter()

class TokenResponse(BaseModel):
    status: str

@router.post("/login", response_model=TokenResponse)
@limiter.limit("5/minute")
async def login_access_token(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await auth_service.authenticate_user(db, form_data)
    
    # Issue tokens
    access_token = create_access_token(subject=user.id, token_version=user.token_version)
    refresh_token_plain = create_refresh_token()
    
    # Store refresh token in db (hashed)
    hashed_rt = hashlib.sha256(refresh_token_plain.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    rt_obj = RefreshToken(
        user_id=user.id,
        token=hashed_rt,
        expires_at=expires_at
    )
    db.add(rt_obj)
    await db.commit()
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=15 * 60, # 15 mins
        path="/"
    )
    
    response.set_cookie(
        key="refresh_token",
        value=refresh_token_plain,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=7 * 24 * 60 * 60, # 7 days
        path="/api/auth"
    )
    
    return {"status": "success"}

@router.post("/refresh", response_model=TokenResponse)
async def refresh_access_token(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    refresh_token_plain = request.cookies.get("refresh_token")
    if not refresh_token_plain:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token missing")
        
    hashed_rt = hashlib.sha256(refresh_token_plain.encode()).hexdigest()
    rt_obj = await refresh_token_repo.get_by_token(db, hashed_rt)
    
    if not rt_obj or rt_obj.revoked or rt_obj.expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired refresh token")
        
    # Get user
    user = await auth_service.repo.get(db, id=rt_obj.user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User inactive or deleted")
        
    # Revoke old token
    rt_obj.revoked = True
    
    # Issue new tokens
    access_token = create_access_token(subject=user.id, token_version=user.token_version)
    new_refresh_plain = create_refresh_token()
    
    new_hashed_rt = hashlib.sha256(new_refresh_plain.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    new_rt_obj = RefreshToken(
        user_id=user.id,
        token=new_hashed_rt,
        expires_at=expires_at
    )
    db.add(new_rt_obj)
    db.add(rt_obj)
    await db.commit()
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=15 * 60,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_plain,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=7 * 24 * 60 * 60,
        path="/api/auth"
    )
    
    return {"status": "success"}

@router.post("/logout", response_model=TokenResponse)
async def logout(
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    refresh_token_plain = request.cookies.get("refresh_token")
    if refresh_token_plain:
        hashed_rt = hashlib.sha256(refresh_token_plain.encode()).hexdigest()
        rt_obj = await refresh_token_repo.get_by_token(db, hashed_rt)
        if rt_obj:
            rt_obj.revoked = True
            db.add(rt_obj)
            await db.commit()
            
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/api/auth")
    
    return {"status": "success"}

class UserResponse(BaseModel):
    id: str
    email: str
    is_active: bool

from app.api.deps import get_current_admin

@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user = Depends(get_current_admin)
):
    return {
        "id": str(current_user.id),
        "email": current_user.email,
        "is_active": current_user.is_active
    }

import httpx
from fastapi.responses import RedirectResponse
import urllib.parse
from app.core.config import settings

@router.get("/google/login")
async def google_login():
    if not settings.GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
    
    redirect_uri = f"{settings.FRONTEND_URL}/api/auth/google/callback"
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"
    return RedirectResponse(auth_url)

@router.get("/google/callback")
async def google_callback(code: str, request: Request, response: Response, db: AsyncSession = Depends(get_db)):
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(status_code=500, detail="Google OAuth not configured")
        
    redirect_uri = f"{settings.FRONTEND_URL}/api/auth/google/callback"
    token_url = "https://oauth2.googleapis.com/token"
    
    async with httpx.AsyncClient() as client:
        token_res = await client.post(token_url, data={
            "client_id": settings.GOOGLE_CLIENT_ID,
            "client_secret": settings.GOOGLE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri
        })
        
        if token_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to exchange token")
            
        token_data = token_res.json()
        access_token_g = token_data.get("access_token")
        
        user_info_res = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {access_token_g}"}
        )
        
        if user_info_res.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to get user info")
            
        user_info = user_info_res.json()
        email = user_info.get("email")
        
    if not email:
        raise HTTPException(status_code=400, detail="No email from Google")
        
    # Check if user exists
    user = await db.scalar(select(AdminUser).where(AdminUser.email == email))
    if not user:
        # For security, we don't auto-register admins via Google.
        raise HTTPException(status_code=403, detail="Unauthorized email address")
        
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account is inactive")
        
    # Issue our tokens
    access_token = create_access_token(subject=user.id, token_version=user.token_version)
    refresh_token_plain = create_refresh_token()
    
    hashed_rt = hashlib.sha256(refresh_token_plain.encode()).hexdigest()
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    rt_obj = RefreshToken(
        user_id=user.id,
        token=hashed_rt,
        expires_at=expires_at
    )
    db.add(rt_obj)
    await db.commit()
    
    # We must redirect to the frontend dashboard, setting cookies on the way
    redirect_response = RedirectResponse(url=f"{settings.FRONTEND_URL}/dashboard")
    
    redirect_response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="lax", # Lax needed for cross-site redirect to work correctly initially
        max_age=15 * 60,
        path="/"
    )
    
    redirect_response.set_cookie(
        key="refresh_token",
        value=refresh_token_plain,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=7 * 24 * 60 * 60,
        path="/api/auth"
    )
    
    return redirect_response
