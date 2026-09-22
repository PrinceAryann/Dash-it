import asyncio
import sys
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
from dotenv import load_dotenv

load_dotenv()
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings

async def cleanup_database():
    print("Starting database cleanup...")
    engine = create_async_engine(settings.DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as db:
        # Wipe data from application tables while preserving schema
        # alembic_version is intentionally preserved
        await db.execute(text("TRUNCATE TABLE projects CASCADE;"))
        await db.execute(text("TRUNCATE TABLE site_settings CASCADE;"))
        await db.execute(text("TRUNCATE TABLE contact_messages CASCADE;"))
        await db.execute(text("TRUNCATE TABLE admin_users CASCADE;"))
        await db.execute(text("TRUNCATE TABLE site_analytics CASCADE;"))
        
        await db.commit()
        print("Database successfully sanitized. All placeholder/dummy data removed.")

if __name__ == "__main__":
    asyncio.run(cleanup_database())
