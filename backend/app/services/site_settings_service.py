from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.site_settings_repository import site_settings_repo
from app.schemas.site_settings import SiteSettingsUpdate
from app.models.site_settings import SiteSettings

class SiteSettingsService:
    def __init__(self, repo):
        self.repo = repo
        
    async def get_settings(self, db: AsyncSession) -> SiteSettings:
        settings = await self.repo.get_settings(db)
        if not settings:
            settings = SiteSettings()
            db.add(settings)
            await db.commit()
            await db.refresh(settings)
        return settings
        
    async def update_settings(self, db: AsyncSession, settings_in: SiteSettingsUpdate) -> SiteSettings:
        settings = await self.get_settings(db)
        update_data = settings_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(settings, field, value)
            
        await db.commit()
        await db.refresh(settings)
        return settings

site_settings_service = SiteSettingsService(site_settings_repo)
