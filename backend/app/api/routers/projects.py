from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Any
from app.api.deps import get_db, get_current_admin
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import project_service
from uuid import UUID

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
async def list_projects(db: AsyncSession = Depends(get_db)):
    items, _ = await project_service.list_projects(db)
    return items

@router.get("/{slug}", response_model=ProjectResponse)
async def get_project(slug: str, db: AsyncSession = Depends(get_db)):
    return await project_service.get_project_by_slug(db, slug)

@router.post("/", response_model=ProjectResponse)
async def create_project(
    project_in: ProjectCreate, 
    db: AsyncSession = Depends(get_db), 
    current_user = Depends(get_current_admin)
):
    return await project_service.create_project(db, project_in)

@router.patch("/{id}", response_model=ProjectResponse)
async def update_project(
    id: UUID,
    project_in: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    return await project_service.update_project(db, id, project_in)

@router.delete("/{id}")
async def delete_project(
    id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    await project_service.soft_delete_project(db, id)
    return {"status": "deleted"}
