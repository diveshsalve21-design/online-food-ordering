from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class RestaurantCreate(BaseModel):
    owner_id: UUID
    name: str
    cuisine: str
    fassai_license_Number: str
    rating: float = 0.0
    is_active: bool = True
    open_at: datetime
    close_at: datetime


class RestaurantUpdate(BaseModel):
    owner_id: Optional[UUID] = None
    name: Optional[str] = None
    cuisine: Optional[str] = None
    fassai_license_Number: Optional[str] = None
    rating: Optional[float] = None
    is_active: Optional[bool] = None
    open_at: Optional[datetime] = None
    close_at: Optional[datetime] = None


class RestaurantResponse(Schema):
    id: UUID
    owner_id: UUID
    name: str
    cuisine: str
    fassai_license_Number: str
    rating: float
    is_active: bool
    open_at: datetime
    close_at: datetime
    created_at: datetime
