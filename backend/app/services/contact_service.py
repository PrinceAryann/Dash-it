from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from typing import List, Tuple
from uuid import UUID
import bleach

from app.repositories.contact_repository import contact_repo
from app.models.contact import ContactInquiry
from app.schemas.contact import ContactCreate

class ContactService:
    def __init__(self, repo):
        self.repo = repo

    async def create_inquiry(self, db: AsyncSession, inquiry_in: ContactCreate) -> ContactInquiry:
        if inquiry_in.honeypot:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid request")

        # Sanitize input
        clean_message = bleach.clean(inquiry_in.message, tags=[], strip=True)
        clean_name = bleach.clean(inquiry_in.name, tags=[], strip=True)

        # Mock Turnstile/reCAPTCHA check here based on user response
        # Currently no specific implementation details were selected, so we skip the actual network call.

        db_obj = ContactInquiry(
            name=clean_name,
            email=inquiry_in.email,
            message=clean_message
        )
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    async def list_inquiries(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> Tuple[List[ContactInquiry], int]:
        items = await self.repo.list(db, skip=skip, limit=limit)
        total = await self.repo.count(db)
        return items, total

    async def update_status(self, db: AsyncSession, id: UUID, status_str: str) -> ContactInquiry:
        inquiry = await self.repo.get(db, id)
        if not inquiry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found")
        
        inquiry.status = status_str
        db.add(inquiry)
        await db.commit()
        await db.refresh(inquiry)
        return inquiry

contact_service = ContactService(contact_repo)
