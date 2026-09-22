from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.api.deps import get_db, get_current_admin
from app.models.visitor import Visitor

router = APIRouter()

@router.post("/visit")
async def record_visit(request: Request, db: AsyncSession = Depends(get_db)):
    # Simple IP extraction (consider proxies if deployed behind one)
    ip_address = request.headers.get("x-forwarded-for") or request.client.host
    if not ip_address:
        return {"status": "ok"}
    
    # Check if IP exists
    query = select(Visitor).where(Visitor.ip_address == ip_address)
    result = await db.execute(query)
    visitor = result.scalars().first()
    
    if not visitor:
        visitor = Visitor(ip_address=ip_address)
        db.add(visitor)
    else:
        # Just update last visited
        pass 
        
    await db.commit()
    return {"status": "ok"}

@router.get("/visitors/count")
async def get_visitor_count(
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_admin)
):
    query = select(func.count(Visitor.id))
    result = await db.execute(query)
    count = result.scalar()
    return {"count": count}
