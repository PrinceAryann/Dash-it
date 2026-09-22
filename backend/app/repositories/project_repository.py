from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from uuid import UUID

from app.repositories.base import BaseRepository
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

class ProjectRepository(BaseRepository[Project, ProjectCreate, ProjectUpdate]):
    async def get_by_slug(self, db: AsyncSession, slug: str, include_deleted: bool = False) -> Optional[Project]:
        query = select(self.model).where(self.model.slug == slug)
        if not include_deleted:
            query = query.where(self.model.deleted_at.is_(None))
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def get(self, db: AsyncSession, id: UUID, include_deleted: bool = False) -> Optional[Project]:
        query = select(self.model).where(self.model.id == id)
        if not include_deleted:
            query = query.where(self.model.deleted_at.is_(None))
        result = await db.execute(query)
        return result.scalar_one_or_none()

    async def list(
        self, db: AsyncSession, *, skip: int = 0, limit: int = 100, include_deleted: bool = False
    ) -> List[Project]:
        query = select(self.model).offset(skip).limit(limit)
        if not include_deleted:
            query = query.where(self.model.deleted_at.is_(None))
        result = await db.execute(query)
        return result.scalars().all()

    async def count(self, db: AsyncSession, include_deleted: bool = False) -> int:
        query = select(func.count(self.model.id))
        if not include_deleted:
            query = query.where(self.model.deleted_at.is_(None))
        result = await db.execute(query)
        return result.scalar_one()

    async def soft_delete(self, db: AsyncSession, *, id: UUID) -> Optional[Project]:
        obj = await self.get(db, id, include_deleted=True)
        if obj and not obj.deleted_at:
            obj.deleted_at = func.now()
            db.add(obj)
            await db.commit()
            await db.refresh(obj)
        return obj

project_repo = ProjectRepository(Project)
