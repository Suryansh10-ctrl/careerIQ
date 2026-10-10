import jwt
import bcrypt
import datetime
from fastapi import APIRouter, HTTPException, status, Depends
from app.config import settings
from app.schemas.auth import UserRegister, UserLogin, TokenResponse
from app.database import db_instance, in_memory_users
from app.middleware.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

def hash_password(password: str) -> str:
    # Truncate password if > 72 bytes for bcrypt compatibility
    pwd_bytes = password.encode('utf-8')[:72]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    pwd_bytes = plain_password.encode('utf-8')[:72]
    hash_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(pwd_bytes, hash_bytes)

def create_tokens(user_id: str, email: str, role: str):
    access_payload = {
        "userId": user_id,
        "email": email,
        "role": role,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    }
    refresh_payload = {
        "userId": user_id,
        "email": email,
        "role": role,
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    }
    access_token = jwt.encode(access_payload, settings.JWT_SECRET, algorithm=settings.ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, settings.JWT_REFRESH_SECRET, algorithm=settings.ALGORITHM)
    return access_token, refresh_token

@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(data: UserRegister):
    email_lower = data.email.lower()
    hashed_pwd = hash_password(data.password)
    user_id = f"usr_{int(datetime.datetime.now().timestamp())}"

    if db_instance.is_connected:
        existing = await db_instance.db.users.find_one({"email": email_lower})
        if existing:
            raise HTTPException(status_code=409, detail="User with this email already exists.")
        
        user_doc = {
            "userId": user_id,
            "email": email_lower,
            "passwordHash": hashed_pwd,
            "role": "user",
            "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        await db_instance.db.users.insert_one(user_doc)
    else:
        if email_lower in in_memory_users:
            raise HTTPException(status_code=409, detail="User with this email already exists.")
        in_memory_users[email_lower] = {
            "userId": user_id,
            "email": email_lower,
            "passwordHash": hashed_pwd,
            "role": "user"
        }

    access_token, refresh_token = create_tokens(user_id, email_lower, "user")
    return {
        "success": True,
        "message": "Account registered successfully.",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {"id": user_id, "email": email_lower, "role": "user", "name": data.name or "Explorer"}
    }

@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    email_lower = data.email.lower()

    user = None
    if db_instance.is_connected:
        user = await db_instance.db.users.find_one({"email": email_lower})
    else:
        user = in_memory_users.get(email_lower)
        if not user and (email_lower in ["captain@careeriq.io", "demo@careeriq.com"]):
            # Auto-provision demo account for local dev testing
            user = {
                "userId": "usr_demo_nautical",
                "email": email_lower,
                "passwordHash": hash_password("password123"),
                "role": "user"
            }
            in_memory_users[email_lower] = user

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    if not verify_password(data.password, user["passwordHash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    access_token, refresh_token = create_tokens(user["userId"], user["email"], user.get("role", "user"))
    return {
        "success": True,
        "message": "Login successful.",
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {"id": user["userId"], "email": user["email"], "role": user.get("role", "user")}
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {"success": True, "user": current_user}
