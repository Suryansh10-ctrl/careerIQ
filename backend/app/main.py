import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import auth, profile, roadmap, skill_gap, jobs, domains, resume

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("careeriq.main")

app = FastAPI(
    title="CareerIQ API — Sail Towards Opportunity",
    description="Backend API for CareerIQ full-stack platform featuring skill-gap engine, unified job discovery, and interactive tree-based learning roadmap.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lifecycle events
@app.on_event("startup")
async def startup_db_client():
    logger.info("Initializing CareerIQ Python API server...")
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()

# Include Routers under /api/v1
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(profile.router, prefix=settings.API_V1_STR)
app.include_router(roadmap.router, prefix=settings.API_V1_STR)
app.include_router(skill_gap.router, prefix=settings.API_V1_STR)
app.include_router(jobs.router, prefix=settings.API_V1_STR)
app.include_router(domains.router, prefix=settings.API_V1_STR)
app.include_router(resume.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "online",
        "platform": "CareerIQ — Sail Towards Opportunity",
        "backend": "Python FastAPI",
        "docs": "/docs",
        "api_version": "v1"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
