import asyncio
import sys
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from argon2 import PasswordHasher
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.models.user import AdminUser

ph = PasswordHasher()

async def seed_admin():
    email = os.environ.get("ADMIN_EMAIL")
    password = os.environ.get("ADMIN_PASSWORD")
    
    if not email or not password:
        print("Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set.")
        sys.exit(1)

    engine = create_async_engine(settings.DATABASE_URL)
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as db:
        query = select(AdminUser).where(AdminUser.email == email)
        result = await db.execute(query)
        existing_user = result.scalars().first()
        
        if existing_user:
            print(f"Admin user with email {email} already exists. Seeding skipped.")
            return
            
        hashed_password = ph.hash(password)
        new_admin = AdminUser(
            email=email,
            hashed_password=hashed_password
        )
        db.add(new_admin)
        await db.commit()
        print(f"Admin user {email} seeded successfully from environment variables.")

if __name__ == "__main__":
    asyncio.run(seed_admin())
