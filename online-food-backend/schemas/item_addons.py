from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class ItemAddonCreate(BaseModel):
    menu_item_id: UUID
    name: str
    price: float


class ItemAddonUpdate(BaseModel):
    menu_item_id: Optional[UUID] = None
    name: Optional[str] = None
    price: Optional[float] = None


class ItemAddonResponse(Schema):
    id: UUID
    menu_item_id: UUID
    name: str
    price: float
