from fastapi import APIRouter
from app.api.routers.projects import router as projects_router
from app.api.routers.contact import router as contact_router
from app.api.routers.auth import router as auth_router
from app.api.routers.site_settings import router as site_settings_router
from app.api.routers.analytics import router as analytics_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(projects_router, prefix="/projects", tags=["projects"])
api_router.include_router(contact_router, prefix="/contact", tags=["contact"])
api_router.include_router(site_settings_router, prefix="/site-settings", tags=["site-settings"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
