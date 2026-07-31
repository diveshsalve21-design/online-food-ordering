from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from .base import Schema


class OrderItemCreate(BaseModel):
    order_id: UUID
    menu_item_id: UUID
    quantity: int = 1
    unit_price_snapshot: float
    subtotal: float


class OrderItemUpdate(BaseModel):
    order_id: Optional[UUID] = None
    menu_item_id: Optional[UUID] = None
    quantity: Optional[int] = None
    unit_price_snapshot: Optional[float] = None
    subtotal: Optional[float] = None


class OrderItemResponse(Schema):
    id: UUID
    order_id: UUID
    menu_item_id: UUID
    quantity: int
    unit_price_snapshot: float
    subtotal: float
