from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Dash-it API"
    DATABASE_URL: str
    SECRET_KEY: str
    JWT_SECRET_KEY: str
    JWT_REFRESH_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str
    ADMIN_NAME: str = "Admin"

    MAIL_USERNAME: str | None = None
    MAIL_PASSWORD: str | None = None
    MAIL_SERVER: str | None = None
    MAIL_PORT: int | None = 587
    MAIL_FROM: str | None = None

    CLOUDINARY_CLOUD_NAME: str | None = None
    CLOUDINARY_API_KEY: str | None = None
    CLOUDINARY_API_SECRET: str | None = None

    FRONTEND_URL: str = "http://localhost:5173"
    BACKEND_URL: str = "http://localhost:8000"

    PROMETHEUS_ENABLED: bool = True
    LOG_LEVEL: str = "info"

    @property
    def allowed_origins_list(self) -> list[str]:
        # Return localhost for dev, plus whatever FRONTEND_URL is set to
        return ["http://localhost:5173", self.FRONTEND_URL]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
