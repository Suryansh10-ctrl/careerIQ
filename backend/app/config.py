import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CareerIQ API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    JWT_SECRET: str = os.getenv("JWT_SECRET", "careeriq_super_secret_jwt_access_key_2026_nautical")
    JWT_REFRESH_SECRET: str = os.getenv("JWT_REFRESH_SECRET", "careeriq_super_secret_jwt_refresh_key_2026_nautical")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017/careeriq")
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:5000"]

    class Config:
        case_sensitive = True

settings = Settings()
