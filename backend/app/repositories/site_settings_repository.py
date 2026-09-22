from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, Any
from app.repositories.base import BaseRepository
from app.models.site_settings import SiteSettings

class SiteSettingsRepository(BaseRepository[SiteSettings, Any, Any]):
    async def get_settings(self, db: AsyncSession) -> Optional[SiteSettings]:
        query = select(self.model)
        result = await db.execute(query)
        return result.scalars().first()
        
site_settings_repo = SiteSettingsRepository(SiteSettings)
