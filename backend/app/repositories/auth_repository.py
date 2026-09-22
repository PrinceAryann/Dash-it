from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID

from app.repositories.base import BaseRepository
from app.models.user import AdminUser

class AuthRepository(BaseRepository[AdminUser, None, None]): # Using None for schemas for now
    async def get_by_email(self, db: AsyncSession, email: str) -> Optional[AdminUser]:
        query = select(self.model).where(self.model.email == email)
        result = await db.execute(query)
        return result.scalar_one_or_none()

auth_repo = AuthRepository(AdminUser)
