from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from uuid import UUID
from datetime import datetime
import re

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=2000)
    honeypot: Optional[str] = None

    @field_validator("name", "message")
    @classmethod
    def sanitize_html(cls, v: str) -> str:
        # Strip all HTML tags to prevent XSS
        sanitized = re.sub(r'<[^>]*>', '', v)
        return sanitized.strip()

class ContactResponse(BaseModel):
    id: UUID
    name: str
    email: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
