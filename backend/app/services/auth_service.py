from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.repositories.auth_repository import auth_repo
from app.core.security import verify_password, create_access_token
from app.models.user import AdminUser

class AuthService:
    def __init__(self, repo):
        self.repo = repo

    async def authenticate_user(self, db: AsyncSession, form_data: OAuth2PasswordRequestForm) -> AdminUser:
        user = await self.repo.get_by_email(db, form_data.username)
        if not user or not verify_password(form_data.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect email or password")
        elif not user.is_active:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user")
        return user

auth_service = AuthService(auth_repo)
