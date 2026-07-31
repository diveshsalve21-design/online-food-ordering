from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class MenuItemCreate(BaseModel):
    restaurant_id: UUID
    category_id: UUID
    name: str
    description: Optional[str] = None
    price: float
    is_vegetarian: bool = False
    is_available: bool = True
    image_url: Optional[str] = None


class MenuItemUpdate(BaseModel):
    restaurant_id: Optional[UUID] = None
    category_id: Optional[UUID] = None
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    is_vegetarian: Optional[bool] = None
    is_available: Optional[bool] = None
    image_url: Optional[str] = None


class MenuItemResponse(Schema):
    id: UUID
    restaurant_id: UUID
    category_id: UUID
    name: str
    description: Optional[str]
    price: float
    is_vegetarian: bool
    is_available: bool
    image_url: Optional[str]
