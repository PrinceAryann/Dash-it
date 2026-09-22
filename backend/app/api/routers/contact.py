from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Any
from app.api.deps import get_db, get_current_admin
from app.schemas.contact import ContactCreate, ContactResponse
from app.services.contact_service import contact_service
from uuid import UUID

from app.core.rate_limit import limiter

router = APIRouter()

@router.post("/", response_model=ContactResponse)
@limiter.limit("3/hour")
async def submit_contact(
    request: Request,
    inquiry_in: ContactCreate,
    db: AsyncSession = Depends(get_db)
):
    return await contact_service.create_inquiry(db, inquiry_in)

@router.get("/", response_model=List[ContactResponse])
async def list_inquiries(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    items, _ = await contact_service.list_inquiries(db)
    return items

@router.patch("/{id}/status")
async def update_status(
    id: UUID,
    status: str,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    return await contact_service.update_status(db, id, status)
