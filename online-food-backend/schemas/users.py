from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from models.Enums import UserRole
from .base import Schema


class UserCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    password_hash: str
    role: UserRole = UserRole.CUSTOMER
    is_active: bool = True


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    password_hash: Optional[str] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None


class UserResponse(Schema):
    id: UUID
    full_name: str
    email: str
    phone: str
    password_hash: str
    role: UserRole
    is_active: bool
    created_at: datetime
