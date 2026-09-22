from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from typing import Optional
from uuid import UUID

from app.repositories.base import BaseRepository
from app.models.user import RefreshToken

class RefreshTokenRepository(BaseRepository[RefreshToken, None, None]):
    async def get_by_token(self, db: AsyncSession, token: str) -> Optional[RefreshToken]:
        query = select(self.model).where(self.model.token == token)
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def revoke_token(self, db: AsyncSession, token: str) -> None:
        query = update(self.model).where(self.model.token == token).values(revoked=True)
        await db.execute(query)
        await db.commit()

refresh_token_repo = RefreshTokenRepository(RefreshToken)
