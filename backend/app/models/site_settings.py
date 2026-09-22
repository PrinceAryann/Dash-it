from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime, timezone
from app.models.base import Base

class SiteSettings(Base):
    __tablename__ = "site_settings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    next_free_timeline = Column(String, default="Available for new projects — Q1 2027")
    is_hiring = Column(Boolean, default=False)
    accepting_projects = Column(Boolean, default=True)
    
    # Hero Content
    hero_title = Column(String, default="We build websites people remember.")
    hero_subtitle = Column(String, default="You bring the idea. We turn it into a fast, modern website that looks good, works smoothly, and grows with your business.")
    developer_name = Column(String, default="Prince Aryan")
    
    # Social Links
    github_url = Column(String, default="https://github.com")
    linkedin_url = Column(String, default="https://linkedin.com")
    instagram_url = Column(String, default="https://instagram.com")
    contact_email = Column(String, default="hello@dash-it.com")
    
    # SEO
    site_title = Column(String, default="Prince Aryan | Portfolio")
    site_description = Column(String, default="Portfolio of Prince Aryan, a digital designer and developer.")
    
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
