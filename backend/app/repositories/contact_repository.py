from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.repositories.base import BaseRepository
from app.models.contact import ContactInquiry
from app.schemas.contact import ContactCreate

class ContactRepository(BaseRepository[ContactInquiry, ContactCreate, None]):
    async def count(self, db: AsyncSession) -> int:
        query = select(func.count(self.model.id))
        result = await db.execute(query)
        return result.scalar_one()

contact_repo = ContactRepository(ContactInquiry)
