from sqlalchemy import Column, String, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timezone
from app.models.base import Base

class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(String, nullable=False)
    status = Column(Enum('PENDING', 'REVIEWED', 'REPLIED', name='inquiry_status'), default='PENDING')
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
