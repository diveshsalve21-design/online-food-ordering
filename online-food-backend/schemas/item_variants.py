from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class ItemVariantCreate(BaseModel):
    menu_item_id: UUID
    name: str
    price_delta: float = 0.0


class ItemVariantUpdate(BaseModel):
    menu_item_id: Optional[UUID] = None
    name: Optional[str] = None
    price_delta: Optional[float] = None


class ItemVariantResponse(Schema):
    id: UUID
    menu_item_id: UUID
    name: str
    price_delta: float
