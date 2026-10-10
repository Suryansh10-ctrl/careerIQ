import jwt
from fastapi import Request, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import settings

security = HTTPBearer(auto_error=False)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        # Default dev user fallback for seamless exploration
        return {"userId": "usr_demo_nautical", "email": "captain@careeriq.io", "role": "user"}
    
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        # Dev fallback for invalid/expired tokens during testing & guest browsing
        return {"userId": "usr_demo_nautical", "email": "captain@careeriq.io", "role": "user"}

async def get_optional_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        return {"userId": "usr_guest", "email": "guest@careeriq.io", "role": "guest"}
    try:
        payload = jwt.decode(credentials.credentials, settings.JWT_SECRET, algorithms=[settings.ALGORITHM])
        return payload
    except Exception:
        return {"userId": "usr_guest", "email": "guest@careeriq.io", "role": "guest"}
