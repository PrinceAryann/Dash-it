from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timezone
from app.models.base import Base

class Visitor(Base):
    __tablename__ = "visitors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ip_address = Column(String, unique=True, index=True, nullable=False)
    first_visited_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    last_visited_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
