from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_admin
from app.schemas.site_settings import SiteSettingsUpdate, SiteSettingsResponse
from app.services.site_settings_service import site_settings_service

router = APIRouter()

@router.get("/", response_model=SiteSettingsResponse)
async def get_site_settings(db: AsyncSession = Depends(get_db)):
    return await site_settings_service.get_settings(db)

@router.patch("/", response_model=SiteSettingsResponse)
async def update_site_settings(
    settings_in: SiteSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    return await site_settings_service.update_settings(db, settings_in)
