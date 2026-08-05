from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class RestaurantCreate(BaseModel):
    owner_id: UUID
    name: str
    cuisine: str
    fassai_license_Number: Optional[str] = "FSSAI-10001"
    rating: float = 4.5
    is_active: bool = True
    open_at: Optional[datetime] = None
    close_at: Optional[datetime] = None
    image_url: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    delivery_time: Optional[str] = "25-35 min"
    delivery_fee: Optional[float] = 2.99
    min_order_amount: Optional[float] = 10.00


class RestaurantUpdate(BaseModel):
    owner_id: Optional[UUID] = None
    name: Optional[str] = None
    cuisine: Optional[str] = None
    fassai_license_Number: Optional[str] = None
    rating: Optional[float] = None
    is_active: Optional[bool] = None
    open_at: Optional[datetime] = None
    close_at: Optional[datetime] = None
    image_url: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    delivery_time: Optional[str] = None
    delivery_fee: Optional[float] = None
    min_order_amount: Optional[float] = None


class RestaurantResponse(Schema):
    id: UUID
    owner_id: UUID
    name: str
    cuisine: str
    fassai_license_Number: Optional[str] = None
    rating: float
    is_active: bool
    open_at: Optional[datetime] = None
    close_at: Optional[datetime] = None
    image_url: Optional[str] = None
    cover_image: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    delivery_time: Optional[str] = "25-35 min"
    delivery_fee: Optional[float] = 2.99
    min_order_amount: Optional[float] = 10.00
    created_at: datetime
