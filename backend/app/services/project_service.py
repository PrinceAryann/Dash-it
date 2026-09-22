from typing import List, Optional, Tuple
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from app.repositories.project_repository import project_repo
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

class ProjectService:
    def __init__(self, repo):
        self.repo = repo

    async def get_project_by_slug(self, db: AsyncSession, slug: str) -> Project:
        project = await self.repo.get_by_slug(db, slug)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project

    async def get_project(self, db: AsyncSession, id: UUID) -> Project:
        project = await self.repo.get(db, id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project

    async def list_projects(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> Tuple[List[Project], int]:
        items = await self.repo.list(db, skip=skip, limit=limit)
        total = await self.repo.count(db)
        return items, total

    async def create_project(self, db: AsyncSession, project_in: ProjectCreate) -> Project:
        # Check if slug exists
        existing = await self.repo.get_by_slug(db, project_in.slug)
        if existing:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project with this slug already exists")
        return await self.repo.create(db, obj_in=project_in)

    async def update_project(self, db: AsyncSession, id: UUID, project_in: ProjectUpdate) -> Project:
        project = await self.get_project(db, id)
        return await self.repo.update(db, db_obj=project, obj_in=project_in)

    async def soft_delete_project(self, db: AsyncSession, id: UUID) -> Project:
        project = await self.repo.soft_delete(db, id=id)
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        return project

project_service = ProjectService(project_repo)
