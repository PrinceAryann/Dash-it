from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    description: str
    image_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    features: Optional[List[str]] = []
    is_featured: Optional[bool] = False

class ProjectCreate(ProjectBase):
    slug: str

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    features: Optional[List[str]] = None
    is_featured: Optional[bool] = None

class ProjectResponse(ProjectBase):
    id: UUID
    slug: str
    created_at: datetime

    class Config:
        from_attributes = True
