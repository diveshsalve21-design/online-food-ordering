from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, field_validator

from models.Enums import UserRole
from .base import Schema


class UserCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    password_hash: str
    role: UserRole = UserRole.CUSTOMER
    is_active: bool = True

    @field_validator("role", mode="before")
    @classmethod
    def accept_role_names(cls, value):
        """Accept enum names (for example, ``CUSTOMER``) as API input too."""
        if isinstance(value, str) and value.upper() in UserRole.__members__:
            return UserRole[value.upper()]
        return value


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
    role: UserRole
    is_active: bool
    created_at: datetime
