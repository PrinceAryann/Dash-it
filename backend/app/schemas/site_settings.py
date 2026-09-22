from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class SiteSettingsBase(BaseModel):
    next_free_timeline: Optional[str] = None
    is_hiring: Optional[bool] = None
    accepting_projects: Optional[bool] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    developer_name: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    instagram_url: Optional[str] = None
    contact_email: Optional[str] = None
    site_title: Optional[str] = None
    site_description: Optional[str] = None

class SiteSettingsUpdate(SiteSettingsBase):
    pass

class SiteSettingsResponse(SiteSettingsBase):
    id: UUID
    updated_at: datetime
    
    class Config:
        from_attributes = True
