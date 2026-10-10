import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger("careeriq.database")

class Database:
    client: AsyncIOMotorClient = None
    db = None
    is_connected: bool = False

db_instance = Database()

# In-memory stores for dev mode fallback
in_memory_users = {}
in_memory_profiles = {}
in_memory_roadmaps = {}
in_memory_completion_events = []
in_memory_resumes = {}


async def connect_to_mongo():
    try:
        db_instance.client = AsyncIOMotorClient(settings.MONGODB_URI, serverSelectionTimeoutMS=2000)
        db_instance.db = db_instance.client.get_database()
        # Test connection ping
        await db_instance.client.admin.command('ping')
        db_instance.is_connected = True
        logger.info(f"Connected to MongoDB at {settings.MONGODB_URI}")
    except Exception as e:
        db_instance.is_connected = False
        logger.warning(f"MongoDB connection unavailable at {settings.MONGODB_URI}. Operating in-memory mode: {e}")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        logger.info("Closed MongoDB connection.")
